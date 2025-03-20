        // API endpoint from documentation [[1]][[5]]
        const API_URL = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

        // Function to fetch and display quote
        async function getNewQuote() {
            try {
              const response = await fetch(API_URL);
              if (!response.ok) throw new Error(`API Error: ${response.status}`);
              else{
                const data = await response.json();
              
              // Update quote and author (adjust keys if needed)
              document.getElementById('quoteText').textContent = `"${data.data.content}"`;
              document.getElementById('authorText').textContent = `- ${data.data.author}`;
              
              // Random background color (optional)
              document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 90%)`;
              }
            }catch (error) {
              console.error('Error fetching quote:', error);
              alert('Failed to get a new quote. Check console for details.');
              }
        }
        // Copy to clipboard [[8]]
        function copyToClipboard() {
            const text = `${document.getElementById('quoteText').textContent} ${document.getElementById('authorText').textContent}`;
            navigator.clipboard.writeText(text)
                .then(() => alert('Quote copied to clipboard!'))
                .catch(() => alert('Copying failed.'));
        }

        // Share on Twitter [[4]]
        function shareOnTwitter() {
            const text = encodeURIComponent(`${document.getElementById('quoteText').textContent} ${document.getElementById('authorText').textContent}`);
            alert("Keep already logged in to Twitter to share on Twitter.");
            const url = `https://x.com/compose/post?text=${text}`;
            window.open(url);
        }

        // Export quote as image [[6]]
        async function exportQuote() {
            const quoteBox = document.getElementById('quoteBox');
            const canvas = await html2canvas(quoteBox);
            const link = document.createElement('a');
            
            canvas.toBlob((blob) => {
                link.href = URL.createObjectURL(blob);
                link.download = 'quote.png';
                link.click();
            });
        }

        // new quote generate
        newQuoteBtn.addEventListener('click', getNewQuote);