import React from 'react';
import { Clock, Calendar, ArrowLeft, Share2, Tag } from 'lucide-react';
import SEOHead from './SEOHead';
import { blogArticles } from './Blog';
import { Page } from '../types';

interface BlogArticleProps {
  slug: string;
  onNavigate: (page: Page) => void;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ slug, onNavigate }) => {
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold">Article non trouvé</h1>
        <button onClick={() => onNavigate('blog')} className="mt-4 text-blue-600">
          Retour au blog
        </button>
      </div>
    );
  }

  return (
    <article className="py-16 bg-gray-50 min-h-screen">
      <SEOHead
        title={`${article.title} | Blog Fun Event`}
        description={article.excerpt}
        keywords={article.keywords.join(', ')}
        ogTitle={article.title}
        ogDescription={article.excerpt}
        ogImage={article.image}
        canonicalUrl={`https://fun-event.fr/${article.slug}`}
        breadcrumbs={[
          { name: "Accueil", url: "https://fun-event.fr/" },
          { name: "Blog", url: "https://fun-event.fr/blog" },
          { name: article.title, url: `https://fun-event.fr/${article.slug}` }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "description": article.excerpt,
          "image": article.image,
          "datePublished": article.date,
          "dateModified": article.date,
          "inLanguage": "fr-FR",
          "author": {
            "@type": "Organization",
            "name": "Fun Event",
            "url": "https://fun-event.fr"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Fun Event",
            "logo": {
              "@type": "ImageObject",
              "url": "https://i.imgur.com/gfhDZfm.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://fun-event.fr/${article.slug}`
          },
          "keywords": article.keywords.join(', '),
          "articleSection": article.category
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('blog')}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour au blog
        </button>

        {/* Header */}
        <header className="mb-8">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-500">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(article.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {article.readTime} de lecture
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-80 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-10">
          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph, index) => {
              // Détection des titres (commencent par emoji ou majuscules avec :)
              const isTitle = /^[🎈📅🏰📊🎂🎁💰📍❓🛡️📜⚠️✅🏆💒👶🎪💡📦🌦️🏢🎯🏆📖📏👶💰📅]/u.test(paragraph) ||
                              /^(RÈGLE|ÉTAPE|TOP|---)/i.test(paragraph);
              const isSubTitle = /^(RÈGLE \d|ÉTAPE \d|\d+\.)/i.test(paragraph);
              const isList = paragraph.includes(' • ') || paragraph.includes(' ✓ ') || paragraph.includes(' □ ');
              const isTable = paragraph.includes(' → ') && paragraph.includes(' | ');
              const isFAQ = paragraph.startsWith('Q:') || paragraph.includes('R:');

              if (isTitle && !isSubTitle) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b-2 border-blue-500">
                    {paragraph}
                  </h2>
                );
              }

              if (isSubTitle) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-blue-600 mt-6 mb-3">
                    {paragraph}
                  </h3>
                );
              }

              if (isTable) {
                const rows = paragraph.split(' | ');
                return (
                  <div key={index} className="my-6 overflow-x-auto">
                    <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-4 space-y-2">
                      {rows.map((row, rowIndex) => {
                        const cells = row.split(' → ');
                        return (
                          <div key={rowIndex} className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                            {cells.map((cell, cellIndex) => (
                              <span key={cellIndex} className={`${cellIndex === 0 ? 'font-semibold text-gray-900 min-w-[150px]' : 'text-gray-600'}`}>
                                {cell}
                                {cellIndex < cells.length - 1 && <span className="text-orange-500 mx-2">→</span>}
                              </span>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (isList) {
                const items = paragraph.split(/[•✓□]/).filter(item => item.trim());
                return (
                  <ul key={index} className="my-4 space-y-2">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span>{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (isFAQ) {
                const parts = paragraph.split(' | ');
                return (
                  <div key={index} className="my-4 space-y-3">
                    {parts.map((part, partIndex) => {
                      if (part.startsWith('Q:')) {
                        return (
                          <div key={partIndex} className="bg-blue-50 p-4 rounded-lg">
                            <p className="font-semibold text-blue-800">{part}</p>
                          </div>
                        );
                      }
                      return (
                        <div key={partIndex} className="bg-gray-50 p-4 rounded-lg ml-4">
                          <p className="text-gray-700">{part}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <Tag className="w-5 h-5 text-gray-400" />
          {article.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Prêt à organiser votre événement ?</h2>
          <p className="text-lg mb-6 opacity-90">
            Contactez Fun Event pour un devis gratuit et personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('devis')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all"
            >
              Demander un devis
            </button>
            <button
              onClick={() => onNavigate('catalogue')}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Voir le catalogue
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogArticles
              .filter(a => a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <div
                  key={relatedArticle.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => onNavigate(relatedArticle.slug as Page)}
                >
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogArticle;
