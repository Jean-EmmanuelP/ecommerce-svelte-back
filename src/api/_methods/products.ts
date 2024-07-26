// Fonction de recherche améliorée avec scoring
export function searchProducts(products, query) {
    const lowerCaseQuery = query.toLowerCase();
    return products
      .map((product) => {
        let score = 0;
        const lowerCaseTitle = product.title.toLowerCase();
        const lowerCaseDescription = product.description.toLowerCase();
  
        // Correspondance exacte dans le titre
        if (lowerCaseTitle === lowerCaseQuery) {
          score += 100;
        } else if (lowerCaseTitle.includes(lowerCaseQuery)) {
          // Correspondance partielle dans le titre
          score += 50;
        }
  
        // Correspondance exacte dans la description
        if (lowerCaseDescription === lowerCaseQuery) {
          score += 50;
        } else if (lowerCaseDescription.includes(lowerCaseQuery)) {
          // Correspondance partielle dans la description
          score += 25;
        }
  
        // Correspondance de préfixe dans le titre
        if (lowerCaseTitle.startsWith(lowerCaseQuery)) {
          score += 30;
        }
  
        // Correspondance de préfixe dans la description
        if (lowerCaseDescription.startsWith(lowerCaseQuery)) {
          score += 15;
        }
  
        return { ...product, score };
      })
      .filter((product) => product.score > 0) // Garder seulement les produits avec un score > 0
      .sort((a, b) => b.score - a.score); // Trier par score décroissant
  }