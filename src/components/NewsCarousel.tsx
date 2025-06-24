
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { newsService } from '@/utils/storage';
import { News } from '@/types';

export const NewsCarousel = () => {
  const [news, setNews] = useState<News[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setNews(newsService.getPublished());
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= news.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? news.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (news.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, news.length]);

  if (news.length === 0) {
    return (
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Últimas <span className="text-primary">Notícias</span>
          </h2>
          <div className="text-center text-muted-foreground">
            Nenhuma notícia disponível no momento.
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Últimas <span className="text-primary">Notícias</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fique por dentro das novidades do mercado imobiliário
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {news.map((article) => (
                <div key={article.id} className="w-full flex-shrink-0">
                  <Card className="overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <img
                          src={article.image || '/placeholder.svg'}
                          alt={article.title}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                      </div>
                      
                      <div className="md:w-1/2">
                        <CardContent className="p-8 h-full flex flex-col justify-center">
                          <div className="space-y-4">
                            <Badge variant="secondary" className="w-fit">
                              Notícia
                            </Badge>
                            
                            <h3 className="text-2xl font-bold leading-tight">
                              {article.title}
                            </h3>
                            
                            <p className="text-muted-foreground line-clamp-3">
                              {article.description}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {article.author}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(article.createdAt)}
                              </div>
                            </div>
                            
                            <Button className="w-fit">
                              Ler mais
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {news.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50 z-10"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50 z-10"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <div className="flex justify-center mt-6 space-x-2">
                {news.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
