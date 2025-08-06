import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, company, service, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Nombre, email y mensaje son requeridos' },
                { status: 400 }
            );
        }

        // Create transporter (using Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email notification to you (business owner only)
        const businessEmailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
            subject: `Nueva consulta de ${name} - ${service || 'Consulta General'}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            Nueva Consulta - Artes Gráficas Digitales
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Información del Cliente</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
            <p><strong>Empresa:</strong> ${company || 'No proporcionado'}</p>
            <p><strong>Servicio de interés:</strong> ${service || 'No especificado'}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Mensaje</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #ecfdf5; border-radius: 8px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              <strong>Acciones sugeridas:</strong><br>
              • Responder al cliente en las próximas 24 horas<br>
              • Contactar por WhatsApp: <a href="https://wa.me/52${phone?.replace(/\D/g, '')}" style="color: #059669;">+52 ${phone}</a><br>
              • Preparar cotización si es necesario
            </p>
          </div>
        </div>
      `,
        };

        // Send only business notification email
        await transporter.sendMail(businessEmailOptions);

        // Also save submission locally for backup/admin view
        try {
            await fetch(`${request.nextUrl.origin}/api/contact/submissions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, company, service, message }),
            });
        } catch (saveError) {
            console.error('Error saving submission locally:', saveError);
            // Don't fail the main request if local save fails
        }

        return NextResponse.json(
            { message: 'Mensaje enviado correctamente' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}