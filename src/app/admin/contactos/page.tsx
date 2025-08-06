'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Building, Calendar, MessageCircle } from 'lucide-react';

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

export default function AdminContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'completed'>('all');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact/submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(submission =>
    filter === 'all' || submission.status === filter
  );

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Cargando contactos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Contactos Recibidos
          </h1>
          <p className="text-gray-300">
            Gestiona las consultas recibidas a través del formulario de contacto
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {[
            { key: 'all', label: 'Todos', count: submissions.length },
            { key: 'new', label: 'Nuevos', count: submissions.filter(s => s.status === 'new').length },
            { key: 'contacted', label: 'Contactados', count: submissions.filter(s => s.status === 'contacted').length },
            { key: 'completed', label: 'Completados', count: submissions.filter(s => s.status === 'completed').length },
          ].map(({ key, label, count }) => (
            <Button
              key={key}
              onClick={() => setFilter(key as 'all' | 'new' | 'contacted' | 'completed')}
              variant={filter === key ? 'default' : 'outline'}
              className={`${filter === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                }`}
            >
              {label} ({count})
            </Button>
          ))}
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <Card className="p-8 bg-gray-900 border-gray-800 text-center">
              <p className="text-gray-400">No hay contactos para mostrar</p>
            </Card>
          ) : (
            filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="p-6 bg-gray-900 border-gray-800">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">

                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {submission.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(submission.timestamp)}
                          </span>
                          {submission.service && (
                            <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                              {submission.service}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                        {submission.status === 'new' && 'Nuevo'}
                        {submission.status === 'contacted' && 'Contactado'}
                        {submission.status === 'completed' && 'Completado'}
                      </span>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <a href={`mailto:${submission.email}`} className="hover:text-blue-400 transition-colors">
                          {submission.email}
                        </a>
                      </div>

                      {submission.phone && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <Phone className="w-4 h-4 text-green-400" />
                          <a href={`tel:${submission.phone}`} className="hover:text-green-400 transition-colors">
                            {submission.phone}
                          </a>
                        </div>
                      )}

                      {submission.company && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <Building className="w-4 h-4 text-purple-400" />
                          <span>{submission.company}</span>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Mensaje:</h4>
                      <p className="text-gray-200 leading-relaxed">{submission.message}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <Button
                      onClick={() => window.open(`mailto:${submission.email}`, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Responder Email
                    </Button>

                    {submission.phone && (
                      <Button
                        onClick={() => window.open(`https://wa.me/52${submission.phone.replace(/\D/g, '')}`, '_blank')}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    )}

                    {submission.phone && (
                      <Button
                        onClick={() => window.open(`tel:${submission.phone}`, '_blank')}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Llamar
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Stats */}
        {submissions.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gray-900 border-gray-800 text-center">
              <div className="text-2xl font-bold text-white">{submissions.length}</div>
              <div className="text-sm text-gray-400">Total Contactos</div>
            </Card>
            <Card className="p-4 bg-gray-900 border-gray-800 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {submissions.filter(s => s.status === 'new').length}
              </div>
              <div className="text-sm text-gray-400">Nuevos</div>
            </Card>
            <Card className="p-4 bg-gray-900 border-gray-800 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {submissions.filter(s => s.status === 'contacted').length}
              </div>
              <div className="text-sm text-gray-400">En Proceso</div>
            </Card>
            <Card className="p-4 bg-gray-900 border-gray-800 text-center">
              <div className="text-2xl font-bold text-green-400">
                {submissions.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-400">Completados</div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}