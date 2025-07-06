import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generationHistory, setGenerationHistory] = useState([]);

  const generateImageWithAI = async (prompt: string) => {
    // Симулируем API вызов для генерации изображения
    return new Promise((resolve) => {
      setTimeout(
        () => {
          // Возвращаем путь к одному из предгенерированных изображений
          const images = [
            "/img/b7a3d771-4643-4a48-b09d-4c63aebe3db2.jpg",
            "/img/dd06bf62-df69-4e1a-9a2a-318ae8368522.jpg",
            "/img/557b1fff-e2ec-4e62-9110-6855533707d1.jpg",
          ];
          const randomImage = images[Math.floor(Math.random() * images.length)];
          resolve(randomImage);
        },
        2000 + Math.random() * 2000,
      ); // 2-4 секунды
    });
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      // Формируем промпт с учетом стиля
      let enhancedPrompt = prompt;

      if (style === "anime") {
        enhancedPrompt = `${prompt}, anime style, detailed anime art, vibrant colors`;
      } else if (style === "realistic") {
        enhancedPrompt = `${prompt}, photorealistic, high quality, detailed`;
      } else if (style === "abstract") {
        enhancedPrompt = `${prompt}, abstract art, artistic, creative`;
      } else if (style === "nsfw") {
        enhancedPrompt = `${prompt}, artistic, tasteful`;
      } else if (style === "artistic") {
        enhancedPrompt = `${prompt}, artistic style, beautiful, creative`;
      }

      // Генерируем изображение
      const imagePath = await generateImageWithAI(enhancedPrompt);

      const newImage = {
        id: Date.now(),
        image: imagePath,
        prompt: prompt,
        style: style || "Обычный",
        timestamp: new Date().toLocaleString("ru-RU"),
      };

      setGeneratedImage(newImage);
      setGenerationHistory((prev) => [newImage, ...prev.slice(0, 9)]); // Сохраняем последние 10
    } catch (error) {
      console.error("Ошибка при генерации:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const examples = [
    {
      id: 1,
      image: "/img/b7a3d771-4643-4a48-b09d-4c63aebe3db2.jpg",
      prompt: "Anime-style portrait with blue hair",
      style: "Аниме",
      author: "Alex_AI",
    },
    {
      id: 2,
      image: "/img/dd06bf62-df69-4e1a-9a2a-318ae8368522.jpg",
      prompt: "Mountain lake at sunrise",
      style: "Реализм",
      author: "NatureLover",
    },
    {
      id: 3,
      image: "/img/557b1fff-e2ec-4e62-9110-6855533707d1.jpg",
      prompt: "Cyberpunk abstract art",
      style: "Абстракт",
      author: "CyberArt",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                AI IMAGE GENERATOR
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Image" size={16} className="mr-2" />
                Галерея
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Создавайте уникальные изображения
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent block">
              с помощью ИИ
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Реализм, аниме, NSFW контент и высокое качество. Превратите ваши
            идеи в визуальные шедевры за секунды.
          </p>
        </div>
      </section>

      {/* Generator Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">
                Генератор изображений
              </CardTitle>
              <CardDescription>Опишите что хотите создать</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Промпт
                </label>
                <Textarea
                  placeholder="Опишите изображение которое хотите создать..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-none border-gray-200 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Стиль
                  </label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="border-gray-200 focus:border-indigo-500">
                      <SelectValue placeholder="Выберите стиль" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realistic">Реализм</SelectItem>
                      <SelectItem value="anime">Аниме</SelectItem>
                      <SelectItem value="abstract">Абстракт</SelectItem>
                      <SelectItem value="nsfw">NSFW</SelectItem>
                      <SelectItem value="artistic">Художественный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Качество
                  </label>
                  <Select defaultValue="high">
                    <SelectTrigger className="border-gray-200 focus:border-indigo-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Стандартное</SelectItem>
                      <SelectItem value="high">Высокое</SelectItem>
                      <SelectItem value="ultra">Ультра HD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 text-lg"
              >
                {isGenerating ? (
                  <>
                    <Icon
                      name="Loader2"
                      size={20}
                      className="animate-spin mr-2"
                    />
                    Генерируем...
                  </>
                ) : (
                  <>
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Создать изображение
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Результат генерации */}
          {generatedImage && (
            <Card className="mt-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-2">
                  <Icon
                    name="CheckCircle"
                    size={24}
                    className="text-green-500"
                  />
                  Изображение создано
                </CardTitle>
                <CardDescription>
                  Ваше изображение готово к использованию
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={generatedImage.image}
                    alt={generatedImage.prompt}
                    className="w-full h-auto max-h-96 object-contain bg-gray-100 rounded-lg"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      name="MessageSquare"
                      size={16}
                      className="text-gray-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Промпт:
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {generatedImage.prompt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="secondary"
                        className="bg-indigo-50 text-indigo-700"
                      >
                        {generatedImage.style}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {generatedImage.timestamp}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = generatedImage.image;
                        link.download = `generated-${generatedImage.id}.jpg`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {generationHistory.length > 0
                ? "Ваши созданные изображения"
                : "Примеры работ"}
            </h2>
            <p className="text-lg text-gray-600">
              {generationHistory.length > 0
                ? "История ваших генераций"
                : "Посмотрите что создали другие пользователи"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(generationHistory.length > 0 ? generationHistory : examples).map(
              (item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.prompt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className="bg-indigo-50 text-indigo-700"
                      >
                        {item.style}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        {generationHistory.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {item.timestamp}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = item.image;
                                link.download = `generated-${item.id}.jpg`;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                            >
                              <Icon name="Download" size={14} />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs bg-gray-200">
                                {item.author[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-500">
                              {item.author}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Icon name="User" size={28} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Ваш профиль
                </h3>
                <p className="text-gray-600 mb-6">
                  Управляйте своими генерациями и настройками
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настройки
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Icon name="History" size={16} className="mr-2" />
                    История
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">AI IMAGE GENERATOR</span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="Mail" size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="Github" size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 AI Image Generator. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
