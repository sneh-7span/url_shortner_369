import React from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const saveUrl = (code, url) => {
    const urls = JSON.parse(localStorage.getItem('urls') || '{}');
    urls[code] = {
      longUrl: url,
      createdAt: new Date().toISOString(),
      clicks: 0
    };
    localStorage.setItem('urls', JSON.stringify(urls));
  };

  const checkCodeExists = (code) => {
    const urls = JSON.parse(localStorage.getItem('urls') || '{}');
    return urls.hasOwnProperty(code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!longUrl) {
        throw new Error("Please enter a URL");
      }
      let processedUrl = longUrl;
      if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) {
        processedUrl = `https://${processedUrl}`;
      }

      let code = showCustom && customCode ? customCode : generateRandomCode();

      if (checkCodeExists(code)) {
        if (showCustom && customCode) {
          throw new Error("This custom URL already exists. Please try another one.");
        } else {
          code = generateRandomCode();
        }
      }
      saveUrl(code, processedUrl);

      // Set the result
      setShortUrl(`${window.location.origin}/${code}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="sm:text-6xl font-extrabold text-center sm:my-10">
        The only <span className="text-blue-500">URL</span> shortener <br /> you'll ever need
      </h2>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Shorten Your URL</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="longurl">Enter your long URL</Label>
              <div className="flex items-center space-x-2">
                <Input
                  className="focus-visible:ring-2"
                  id="longurl"
                  type="url"
                  placeholder="https://example.com/very-long-url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                      >
                        {loading ? "Shortening..." : "Shorten"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create a short URL</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant={showCustom ? "default" : "outline"}
                onClick={() => setShowCustom(!showCustom)}
              >
                {showCustom ? 'Hide Custom URL' : 'Custom URL'}
                {showCustom && <Badge variant="secondary" className="ml-2">Active</Badge>}
              </Button>
            </div>

            {showCustom && (
              <div className="space-y-2">
                <Label htmlFor="customCode">Custom URL Code</Label>
                <Input
                  className="focus-visible:ring-2"
                  type="text"
                  id="customCode"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="Enter your custom link"
                />
              </div>
            )}
          </form>

          {error && (
            <div className="mt-4 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {shortUrl && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <Label className="mb-3 font-medium">Your shortened URL:</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => navigator.clipboard.writeText(shortUrl)}
                          className="px-4 py-3 rounded-lg flex-shrink-0"
                        >
                          Copy
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy to clipboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;
