import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Globe, ChevronDown, MessageSquare } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface MessageTemplate {
  id: string;
  name: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  templates: {
    [key: string]: string; // language code -> message content
  };
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬' },
];

const messageTemplates: MessageTemplate[] = [
  {
    id: 'urgent-flood',
    name: 'Urgent Flood Alert',
    priority: 'critical',
    templates: {
      en: '🚨 URGENT FLOOD ALERT: Heavy rainfall detected in your area. Please move to higher ground immediately. Reply HELP for assistance.',
      ha: '🚨 GARGADIN AMBALIYA: An gano ruwan sama mai yawa a yankinku. Ku matsa zuwa tudu nan da nan. Ku amsa da TAIMAKO don samun taimako.',
      yo: '🚨 IKILỌ OMIRIN BI: Ojo to pọ ju ni a ri ni agbegbe yii. E lọ si ibi giga lẹsẹkẹsẹ. Fi IRANLỌWỌ dahun fun iranlọwọ.',
      ig: '🚨 MBA IDEMMIRI DIKA: Achọpụtala oke mmiri ozuzo n\'ógbè gị. Biko kwaga n\'ebe dị elu ozugbo. Zaa ENYEMAKA maka enyemaka.'
    }
  },
  {
    id: 'weather-warning',
    name: 'Weather Warning',
    priority: 'high',
    templates: {
      en: '⚠️ Weather Warning: Heavy rainfall expected in your area within the next 6 hours. Please take necessary precautions.',
      ha: '⚠️ Gargadin Yanayi: Ana tsammanin ruwan sama mai yawa a yankinku cikin awanni 6 masu zuwa. Ku yi hankali da kuma shirye-shirye.',
      yo: '⚠️ Ikilọ Oju-ọjọ: A n retí ojo nla ni agbegbe yii laarin wakati mẹfa to nbọ. E ṣe iṣọra to yẹ.',
      ig: '⚠️ Ịdọ Aka Ihu Igwe: A na-atụ anya oke mmiri ozuzo n\'ógbè gị n\'ime awa isii na-abịa. Biko mee ihe nchekwa kwesịrị.'
    }
  },
  {
    id: 'all-clear',
    name: 'All Clear',
    priority: 'low',
    templates: {
      en: '✅ All Clear: The flood risk has subsided in your area. Normal activities can resume. Thank you for your cooperation.',
      ha: '✅ Komai Lafiya: Hadarin ambaliya ya rage a yankinku. Za ku iya komawa ga ayyukanku na yau da kullun. Mun gode da hadin kai.',
      yo: '✅ Gbogbo Rẹrẹ: Ewu omirin ti dinu ni agbegbe yii. Iṣẹ deede le bẹrẹ. A dupẹ fun ifowọsowọpọ yii.',
      ig: '✅ Ihe Niile Dị Mma: Ihe ize ndụ mmiri ozuzo ebelatawo n\'ógbè gị. Enwere ike ịmaliteghachi ọrụ nkịtị. Daalụ maka nkwado gị.'
    }
  },
  {
    id: 'meeting-notice',
    name: 'Meeting Notice',
    priority: 'medium',
    templates: {
      en: '📋 Community Meeting: Flood preparedness meeting scheduled for tomorrow at the community center. Your attendance is important.',
      ha: '📋 Taron Al\'umma: An shirya taron shirye-shiryen ambaliya gobe a cibiyar al\'umma. Zuwan ku yana da muhimmanci.',
      yo: '📋 Ipade Agbegbe: A ti ṣeto ipade imurasilẹ omirin fun ọla ni ile-iṣẹ agbegbe. Wiwa yii ṣe pataki.',
      ig: '📋 Nzukọ Obodo: Edebere nzukọ maka njikere idemmiri maka echi na ụlọ nzukọ obodo. Ọbịbịa gị dị mkpa.'
    }
  }
];

interface MessageLanguageToggleProps {
  currentLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  onTemplateSelect: (template: string, priority: string) => void;
  messageLength: number;
}

export function MessageLanguageToggle({ 
  currentLanguage, 
  onLanguageChange, 
  onTemplateSelect,
  messageLength 
}: MessageLanguageToggleProps) {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);

  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (languageCode: string) => {
    setIsLanguageDropdownOpen(false);
    onLanguageChange(languageCode);
  };

  const handleTemplateSelect = (template: MessageTemplate) => {
    setIsTemplateDropdownOpen(false);
    const message = template.templates[currentLanguage] || template.templates.en;
    onTemplateSelect(message, template.priority);
  };

  const getSMSCount = (length: number) => {
    // Different languages may have different character encoding requirements
    const smsLength = currentLanguage === 'en' ? 160 : 70; // Non-Latin scripts often use UCS-2 encoding
    return Math.ceil(length / smsLength);
  };

  const getLanguageSpecificInfo = () => {
    switch (currentLanguage) {
      case 'ha':
        return { script: 'Latin', encoding: 'GSM 7-bit', smsLength: 160 };
      case 'yo':
        return { script: 'Latin + Tone marks', encoding: 'UCS-2', smsLength: 70 };
      case 'ig':
        return { script: 'Latin + Tone marks', encoding: 'UCS-2', smsLength: 70 };
      default:
        return { script: 'Latin', encoding: 'GSM 7-bit', smsLength: 160 };
    }
  };

  const langInfo = getLanguageSpecificInfo();

  return (
    <div className="space-y-4">
      {/* Language Selection Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg">Message Language</h3>
        </div>
        <Badge variant="outline" className="flex items-center space-x-1">
          <MessageSquare className="h-3 w-3" />
          <span>{getSMSCount(messageLength)} SMS</span>
        </Badge>
      </div>

      {/* Language Selector and Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language Selection */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="w-full justify-between"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{selectedLanguage.flag}</span>
              <span>{selectedLanguage.nativeName}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {isLanguageDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsLanguageDropdownOpen(false)}
              />
              <Card className="absolute top-full mt-2 left-0 right-0 z-50 shadow-lg">
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
                        <div className="text-sm">{language.name}</div>
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

        {/* Template Selection */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
            className="w-full justify-between"
          >
            <span>Quick Templates ({selectedLanguage.nativeName})</span>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {isTemplateDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsTemplateDropdownOpen(false)}
              />
              <Card className="absolute top-full mt-2 left-0 right-0 z-50 shadow-lg max-h-80 overflow-y-auto">
                <CardContent className="p-2">
                  {messageTemplates.map((template) => {
                    const message = template.templates[currentLanguage] || template.templates.en;
                    const priorityColor = template.priority === 'critical' ? 'bg-red-100 text-red-800' :
                                        template.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                        template.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800';
                    
                    return (
                      <div key={template.id} className="mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTemplateSelect(template)}
                          className="w-full justify-start p-3 h-auto text-left"
                        >
                          <div className="space-y-2 w-full">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{template.name}</span>
                              <Badge className={priorityColor} variant="outline">
                                {template.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {message.substring(0, 100)}...
                            </p>
                          </div>
                        </Button>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Language Information */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Script:</span>
            <span className="ml-1 font-medium">{langInfo.script}</span>
          </div>
          <div>
            <span className="text-gray-600">Encoding:</span>
            <span className="ml-1 font-medium">{langInfo.encoding}</span>
          </div>
          <div>
            <span className="text-gray-600">SMS Length:</span>
            <span className="ml-1 font-medium">{langInfo.smsLength} chars</span>
          </div>
        </div>
      </div>

      {/* Character Count with Language Context */}
      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-600">
          <span>{messageLength} characters</span>
          {messageLength > langInfo.smsLength && (
            <span className="text-orange-600 ml-2">
              (Multi-part SMS: {getSMSCount(messageLength)} messages)
            </span>
          )}
        </div>
        <div className="text-gray-500">
          Writing in {selectedLanguage.nativeName}
        </div>
      </div>
    </div>
  );
}