# code-week_Ecommerce

## eCommerce
### Descrizione
    Progetto che riguarda la realizzazione di un piccolo ecommerce.
    Target: Utenti consumer.

#### Linee guida
   Riferimento a Fake Store API: https://fakestoreapi.com/docs
#### Layout
Task richiesti:
prodotto molto simile ad Amazon ma molto più snello sia lato design che lato funzionalità.
 * Sidebar con la possibilità di selezionare tra le 4 categorie presenti
        https://fakestoreapi.com/products/categories.
 * Al click su ogni categoria mostrare i prodotti per quella categoria. Utilizziamo un loader prima di caricare i dati.    
 * Per evitare di ricaricare continuamente i dati ad ogni click, provare a salvare tutto in uno state locale che interrogheremo prima di rifare la chiamata fetch in modo da
       capire se già quella categoria è stata caricata prima così da ottimizzare l’applicativo.
 * Provare a gestire un carrello. Utilizzare lo state per salvarne gli articoli selezionati e lo “stato” del carrello (pending). Non è necessario in questa fase utilizzare le API di patch/post/put messe a disposizione da Fake Store ma possiamo provare ad utilizzarle.
 * Trovare una strategia per NON perdere il contenuto del carrello al refresh della pagina qualora il carrello ancora fosse in uno stato “pending” (Non ancora “acquistato”).
 * Una volta che il carrello ha almeno un elemento attivare un pulsante acquista che porterà ad un modulo pagamento dove si potrà simulare l’inserimento di dati di carta di credito e procedere all’acquisto.
 * Una volta acquistati i prodotti bisognerebbe mostrare all’utente una thank you page con il sommario dei prodotti acquistati dove si ringrazia l’utente per l’acquista. Il carrello adesso può essere svuotato.
 * NON dimenticare di aggiungere al prezzo finale, ricevuto da API, il 22% di IVA.   

### immagini progetto finale

![image](https://user-images.githubusercontent.com/48923975/114011612-b58d7e80-9865-11eb-9082-7d85a4e3d6d7.png)
![image](https://user-images.githubusercontent.com/48923975/114011662-c807b800-9865-11eb-83bc-390a78c8dbd3.png)
![image](https://user-images.githubusercontent.com/48923975/114011751-e1106900-9865-11eb-848d-5426784d6d65.png)
![image](https://user-images.githubusercontent.com/48923975/114011913-0a30f980-9866-11eb-926b-015c39479f8a.png)
![image](https://user-images.githubusercontent.com/48923975/114012009-1f0d8d00-9866-11eb-9a9a-71e7643171bf.png)
![image](https://user-images.githubusercontent.com/48923975/114012127-3b112e80-9866-11eb-97f2-02760cd0b73d.png)
![image](https://user-images.githubusercontent.com/48923975/114012174-482e1d80-9866-11eb-976d-ed157544f11c.png)
![image](https://user-images.githubusercontent.com/48923975/114012223-59772a00-9866-11eb-9797-342f2641981f.png)







