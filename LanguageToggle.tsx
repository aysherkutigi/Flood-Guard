import { useState } from "react";
import { Button } from "./ui/button";
import { Globe, ChevronDown } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬' },
];

interface LanguageToggleProps {
  currentLanguage?: string;
  onLanguageChange?: (languageCode: string) => void;
}

export function LanguageToggle({ currentLanguage = 'en', onLanguageChange }: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (languageCode: string) => {
    setIsOpen(false);
    onLanguageChange?.(languageCode);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <Globe className="h-4 w-4" />
        <span>{selectedLanguage.flag}</span>
        <span className="hidden sm:inline">{selectedLanguage.code.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full mt-2 right-0 z-50 min-w-[200px] shadow-lg">
            <CardContent className="p-2">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`w-full justify-start space-x-3 ${
                    currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="text-left">
                    <div className="text-sm font-medium">{language.name}</div>
                    <div className="text-xs text-gray-500">{language.nativeName}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </Button>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}