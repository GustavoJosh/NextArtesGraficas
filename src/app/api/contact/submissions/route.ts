import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'completed';
}

const SUBMISSIONS_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, 'contact-submissions.json');

async function ensureDataDirectory() {
  if (!existsSync(SUBMISSIONS_DIR)) {
    await mkdir(SUBMISSIONS_DIR, { recursive: true });
  }
}

async function getSubmissions(): Promise<ContactSubmission[]> {
  try {
    await ensureDataDirectory();
    if (!existsSync(SUBMISSIONS_FILE)) {
      return [];
    }
    const data = await readFile(SUBMISSIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
}

async function saveSubmissions(submissions: ContactSubmission[]) {
  try {
    await ensureDataDirectory();
    await writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error('Error saving submissions:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, message } = body;

    const submission: ContactSubmission = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      company: company || '',
      service: service || '',
      message,
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    const submissions = await getSubmissions();
    submissions.unshift(submission); // Add to beginning
    await saveSubmissions(submissions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json({ error: 'Error saving submission' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error getting submissions:', error);
    return NextResponse.json({ error: 'Error getting submissions' }, { status: 500 });
  }
}