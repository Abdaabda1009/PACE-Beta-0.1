import { LandingNavbar } from "@/components/landingpage/components/Navbar/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

const articles = [
  {
    id: 1,
    category: "Articles",
    date: "Jan 24, 2024",
    title: "Smart Budgeting Strategies for Long-term Financial Success",
    image: "/BlogAssets/Smart-Budgeting-Strategies.png",
    content:
      "Smart budgeting is essential for achieving long-term financial success. This guide explores strategies to manage money wisely, covering topics such as expense tracking, saving techniques, and investment planning.",
  },
  {
    id: 2,
    category: "Articles",
    date: "Jan 20, 2024",
    title: "Investment Basics: Building a Strong Financial Portfolio",
    image: "/BlogAssets/Investment-Basics.png",
    content:
      "Building a strong portfolio requires understanding key investment principles. This article provides insights into different investment vehicles, risk management, and portfolio diversification strategies.",
  },
];

const tags = [
  "All Tags",
  "Product Updates",
  "Financial Tips",
  "Investment Guides",
  "Articles",
];

const Blog = () => {
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(
    null
  );
  const [selectedTag, setSelectedTag] = useState("All Tags");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handlers optimized with useCallback
  const handleArticleClick = useCallback((articleId: number) => {
    setExpandedArticleId(articleId);
  }, []);

  const handleCloseArticle = useCallback(() => {
    setExpandedArticleId(null);
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) handleCloseArticle();
    },
    [handleCloseArticle]
  );

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  const filteredArticles = articles.filter(
    (article) => selectedTag === "All Tags" || article.category === selectedTag
  );

  // Add ESC key handler
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseArticle();
    };

    if (expandedArticleId !== null) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [expandedArticleId, handleCloseArticle]);

  return (
    <div className="min-h-screen ">
      <LandingNavbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag, index) => (
            <Button
              key={index}
              variant={selectedTag === tag ? "default" : "secondary"}
              className={`rounded-full ${
                selectedTag === tag
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {filteredArticles.map((article) => (
            <div key={article.id} className="relative">
              <Card
                className={`bg-dashboard-card border-none hover:scale-[1.02] transition-transform duration-200 cursor-pointer ${
                  expandedArticleId === article.id ? "invisible" : ""
                }`}
                onClick={() => handleArticleClick(article.id)}
              >
                <CardContent className="p-0">
                  <div className="aspect-[16/9] relative overflow-hidden rounded-t-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-blue-600 text-white">
                        {article.category}
                      </Badge>
                      <span className="text-dashboard-muted text-sm">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-white text-xl font-semibold hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>

              {/* Expanded Article Overlay */}
              {expandedArticleId === article.id && (
                <div
                  ref={overlayRef}
                  className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
                  onClick={handleOverlayClick}
                >
                  <Card className="bg-dashboard-card border-none w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Close article"
                          className="absolute right-2 top-2 z-10 bg-black/50 hover:bg-black/70 text-white"
                          onClick={handleCloseArticle}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="aspect-[21/9] relative overflow-hidden rounded-t-lg">
                          <img
                            src={article.image}
                            alt={article.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-blue-600 text-white">
                            {article.category}
                          </Badge>
                          <span className="text-dashboard-muted text-sm">
                            {article.date}
                          </span>
                        </div>
                        <h2 className="text-white text-2xl font-semibold mb-4">
                          {article.title}
                        </h2>
                        <ScrollArea className="h-[400px] pr-6 scrollbar-hide">
                          <p className="text-gray-300 leading-relaxed">
                            {article.content}
                          </p>
                        </ScrollArea>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <Button
            variant="secondary"
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
