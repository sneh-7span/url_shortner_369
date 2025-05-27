import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const RedirectLink = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToUrl = () => {
      try {
        const urls = JSON.parse(localStorage.getItem('urls') || '{}');
        const urlData = urls[code];
        
        if (urlData) {
          urls[code].clicks += 1;
          localStorage.setItem('urls', JSON.stringify(urls));
          window.location.href = urlData.longUrl;
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error redirecting:', error);
        navigate('/');
      }
    };

    redirectToUrl();
  }, [code, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Redirecting...</h2>
        <p className="text-gray-600">Please wait while we redirect you to your destination.</p>
      </div>
    </div>
  );
};

export default RedirectLink;