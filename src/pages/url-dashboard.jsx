import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Badge } from "../components/ui/badge";
import { Trash2 } from "lucide-react";

const UrlDashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('urls') || '{}');
    
      const urlArray = Object.entries(storedUrls).map(([code, data]) => ({
        id: code,
        shortUrl: `${window.location.origin}/${code}`,
        ...data
      }));
    setUrls(urlArray);
    setLoading(false);
  }, []);

  const handleDelete = (id) => {
    const storedUrls = JSON.parse(localStorage.getItem('urls') || '{}');
    delete storedUrls[id];
    localStorage.setItem('urls', JSON.stringify(storedUrls));
    setUrls(urls.filter(url => url.id !== id));
  };

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle className="text-2xl font-bold">Your URLs</CardTitle>
          <Badge variant="secondary">{urls.length} Links</Badge>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-4 text-muted-foreground font-medium">Original URL</th>
                    <th className="p-4 text-muted-foreground font-medium">Short URL</th>
                    <th className="p-4 text-muted-foreground font-medium">Clicks</th>
                    <th className="p-4 text-muted-foreground font-medium">Created At</th>
                    <th className="p-4 text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {urls.map((url) => (
                    <tr key={url.id}>
                      <td className="p-4 truncate max-w-xs">{url.longUrl}</td>
                      <td className="p-4">{url.shortUrl}</td>
                      <td className="p-4">
                        <Badge variant="secondary">{url.clicks}</Badge>
                      </td>
                      <td className="p-4">{new Date(url.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => navigator.clipboard.writeText(url.shortUrl)}
                                  size="sm"
                                  variant="outline"
                                >
                                  Copy
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy to clipboard</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => handleDelete(url.id)}
                                  size="sm"
                                  variant="destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete URL</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UrlDashboard;