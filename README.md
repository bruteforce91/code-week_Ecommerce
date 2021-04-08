# code-week_Ecommerce

## eCommerce
### Descrizione
    Il cliente ci ha commissionato un progetto che riguarda la realizzazione di un piccolo ecommerce.
    Target: Utenti consumer.

#### Linee guida
    Riferimento a Fake Store API: https://fakestoreapi.com/docs
#### Layout
    Il cliente ci ha richiesto un prodotto molto simile ad Amazon ma molto più snello sia lato
    design che lato funzionalità.
    Il cliente ci ha richiesto un MVP entro una settimana con le seguenti funzionalità:
    * Sidebar con la possibilità di selezionare tra le 4 categorie presenti
        https://fakestoreapi.com/products/categories.
    * Al click su ogni categoria mostrare i prodotti per quella categoria. Utilizziamo un   
        loader prima di caricare i dati.    
    * Per evitare di ricaricare continuamente i dati ad ogni click, provare a salvare tutto in
        uno state locale che interrogheremo prima di rifare la chiamata fetch in modo da
        capire se già quella categoria è stata caricata prima così da ottimizzare l’applicativo.
    * Provare a gestire un carrello. Utilizzare lo state per salvarne gli articoli selezionati e
        lo “stato” del carrello (pending). Non è necessario in questa fase utilizzare le API di
        patch/post/put messe a disposizione da Fake Store ma possiamo provare ad
        utilizzarle.
    * Trovare una strategia per NON perdere il contenuto del carrello al refresh della
        pagina qualora il carrello ancora fosse in uno stato “pending” (Non ancora
        “acquistato”).
    * Una volta che il carrello ha almeno un elemento attivare un pulsante acquista che
        porterà ad un modulo pagamento dove si potrà simulare l’inserimento di dati di carta
        di credito e procedere all’acquisto.
    * Una volta acquistati i prodotti bisognerebbe mostrare all’utente una thank you page
        con il sommario dei prodotti acquistati dove si ringrazia l’utente per l’acquista. Il
        carrello adesso può essere svuotato.
    * NON dimenticare di aggiungere al prezzo finale, ricevuto da API, il 22% di IVA.   
