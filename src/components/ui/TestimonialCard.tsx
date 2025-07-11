// src/components/ui/TestimonialCard.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  company: string;
  quote: string;
}

export function TestimonialCard({ name, company, quote }: TestimonialCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-700 text-white">
      <CardContent className="pt-6">
        <Quote className="w-8 h-8 text-blue-400 mb-4" />
<p className="text-gray-300 italic">{`"${quote}"`}</p>
      </CardContent>
      <CardFooter className="flex items-center gap-4 mt-4">
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/8.x/initials/svg?seed=${name}`}
          />
          <AvatarFallback>
            {name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </CardFooter>
    </Card>
  );
}