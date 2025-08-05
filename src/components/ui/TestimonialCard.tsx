// src/components/ui/TestimonialCard.tsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";
import Magnet from "@/components/ui/Magnet";

interface TestimonialCardProps {
  name: string;
  company: string;
  quote: string;
  rating?: number;
  service?: string;
  date?: string;
}

export function TestimonialCard({ 
  name, 
  company, 
  quote, 
  rating = 5, 
  service, 
  date 
}: TestimonialCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <Magnet 
      padding={50} 
      magnetStrength={7}
      wrapperClassName="h-full"
    >
      <Card className="bg-gray-900 border-gray-700 text-white hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            {service && (
              <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                {service}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <Quote className="w-8 h-8 text-blue-400 mb-4" />
          <p className="text-gray-300 italic leading-relaxed">{`"${quote}"`}</p>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-4">
            <Avatar className="ring-2 ring-blue-500/20">
              <AvatarImage
                src={`https://api.dicebear.com/8.x/initials/svg?seed=${name}`}
              />
              <AvatarFallback className="bg-blue-600 text-white">
                {name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white">{name}</p>
              <p className="text-sm text-gray-400">{company}</p>
            </div>
          </div>
          {date && (
            <div className="text-xs text-gray-500">
              {formatDate(date)}
            </div>
          )}
        </CardFooter>
      </Card>
    </Magnet>
  );
}