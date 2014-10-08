Learn Forward Author - Exercises Module
=======================================

This is the assesment module for LFA - textbook creation tool.

To start the demo project goto "test" folder and type "lfa watch"

Below is the documentation in Romanian, gathered up until now.

------------


### Lucruri care trebuie analizate atunci când creăm exercițiile pentru Abecedar


#### Must have

* Marker de interactivitate (iconiță, logo)
* Feedback la exerciții vizual
* Exerciții mai mici se pot combina în exerciții complexe. Fiecare are greutate egală în scorul asamblat, deocamdată
* Salvare și refacere locală


#### Should have

* Feedback la exerciții audio
* Master audio mute din app
* Dicționar pentru validare cuvinte
* Dex integrabil
* Gândirea unor jocuri de cuvinte care să ajute suplimentar învățarea:
	* rebusuri
	* letter-crush
	* ploaie cu litere - selecție cele potrivite (A, R, vocale, literele din zebră, diftongi)
	* spânzurătoarea
	* șarpe
	* Galaxians / Pacman


#### Nice to have

* Markerul de interactivitate este un gif animat care la câteva secunde clipește sau face ceva
* Salvările să se sincronozeze cu online-ul, dacă user/pass/conectat_la_net. Pentru a ușura managementul, in loc de user / pass se generează un id a-la Bitly de 6 alfanum-case-sensitive
* Un canvas mai deștept pentru desene (mini-mspaint vectorial)

## Tipuri de exerciții

* Ascultat audio pe text (Cat in the Hat style)
* Freestyle - casetă text + canvas desen (oricare opțional)
* Enunț plus
	* Numărat ceva în el -> cifră
	* Pus o literă / un grup de litere -> Tastatură Ro
	* Colorat ceva în casetă -> culoare
	* Adevărat sau fals -> True / False
* Completare text -> verificare regexp
* Tăiat cuvinte în silabe
* Tăiat litere în cuvinte
* Completat semne de punctuație / litere în enunțuri
* Unit silabe și creat cuvinte cu ele
* Reordonare elemente în secvență
* Unire sursă cu destinație (tras linii pe ecran, cu snap to guideline)


## Întrebări

* Forțăm copiii să scrie cu diacritice? (tastatură extra cu diacritice)
* La "citesc" de ce trebuie voce?
* Ce înseamnă "widget" la BD (B52)


## Lista prompt-urilor audio necesare pentru exerciții

**OK**

* Bravo!
* Ai reușit!
* Felicitări!
* Excelent!
* Bravo, ai reușit!
* Felicitări, ai făcut o treabă excelentă!
* Superb!

**ALMOST**
* Aproape bine!
* Mai încearcă!
* Mai ai lucruri de făcut înainte ca totul să fie gata

**WRONG**

* Nu, această propoziție nu este adevărată!
* Nu, această propoziție nu este falsă!


**UNKNOWN**

* Verifică rezultatul cu învățătoarea sau părinții tăi!
* Consultă-te cu colegii tăi pentru a verifica dacă ai făcut bine.

================

— — JADE ——

<pre>
//- Convenție mixinuri
//- 1. litere mici
//- 2. minusuri între ele, că merge
//- 3. pentru lucrurile folosite des și generice, no prefix: image, audio, chapter, title, etc
//- 4. pentru lucrurile mai exotice, e indicat ca numele mixinului
//-     ssă fie mai lung ca să arate pachetul/modulul, să știi unde să dai de ele (exercise-container)

//- -----------------------------------------------------------------

//- Karaoke type audio-text sync
//- "Play" button plays the audio and segments are highlighted according to their params
//- When a segment is clicked / tapped the audio plays from the segment start until segment end
//- This allows to have separate words.
//- Can be extended to `+segment(1500, 1732, 'barbarii.mp3')` where a different sound is played when clicked individually

//- Deșteaptă-te române
+audio-sync('desteapta_te_române.mp3')
  +segment(0, 1432) //- 0 is the start millisec, 1432 is the end millisec for the segment
    p Deșteaptă-te, române, din somnul cel de moarte,
  +segment(1500, 1732)
    p În care te-adânciră barbarii de tirani!
  +segment(1890, 1922)
    p Acum ori niciodată croiește-ți altă soarte,
  +segment(1890, 1922)
    p La care să se-nchine și cruzii tăi dușmani!
    +image('dusmanul_inchinat')

  //- instrumental, pauză

  +segment
    p Acum ori niciodată să dăm dovezi la lume
    p Că-n aste mâni mai curge un sânge de roman,
    p Și că-n a noastre piepturi păstrăm cu fală-un nume
    p Triumfător în lupte, un nume de Traian!


//- -----------------------------------------------------------------

//- Checkbox

+exercise('U1L1-observ')
  +statement
    p Bifează propozițiile care corespund desenului
  +check(false) //- (false) is the corect answer
    p Ana este tristă
  +check(false)
    p Directorul vorbește
  +check(true)
    p Învățătoarea primește flori

//- Pickone

+exercise('U1L1-lucrez1')
  +statement
    p Indică numărul de silabe al cuvintelor de mai jos în pătrate
  +numberbox(1, ['1 ', '2', '3', '4', '5']) //- (1) is the corect answer, optional list of choices to be presented in a box
    p Ana
  +numberbox(2, ['⚫', '⚫⚫', '⚫⚫⚫', '⚫⚫⚫⚫'])
    p mama
  +numberbox(2)
    p tata
  +numberbox(3)
    p părinte

//- True - false

//- Single choice

//- Color box

//- Letterbox
+exercise('U1L2-lucrez1')
  +statement
    p Scrie primele litere ale propozițiilor de mai jos în pătrate.

  +letterbox('A|a') //- Regexp for the letters
    p Ana intră la ore
  +letterbox('C|c')
    p Clasa e mare


// - Wordbox with regexp check

//- -----------------------------------------------------------------

//- Select to highlight
//- -- needs to be aware of more clicks, sometimes
//- they're needed (e.g. underline, double-underline)
+exercise('U1L1-lucrez2')
  +statement
    p Apasă sau dă click pe litera <strong>a</strong> de la sfârșitul cuvintelor de mai jos.
  +select-to-highlight
    p
      span.bad Mam
      span.good a
    p
      span.bad An
      span.good a
    p
      span.bad elev
    p
      span.bad părinte
    p
      span.bad director

//- -----------------------------------------------------------------

//- Fixed structure sentence
+exercise('U1L1-lucrez4')
  +statement
    p Formulează propoziții despre fiecare din desenele de mai jos, după modelul dat.
  +image('U1L1-lucrez4-a')
  +fixed-strucrure-sentence
    +word(10) //- optional length parameter
    |
    +word (10)
    br
    +word (20)

  +image('U1L1-lucrez4-b')
  +fixed-strucrure-sentence
    +word(6)
    |
    +word (6)
    |
    +word (6)
    br
    +word (26)


//- -----------------------------------------------------------------

//- Canvas
+exercise('U1L2-lucrez1')
  +statement
    p Desenează obiectul denumit de cuvântul descoperit mai sus
  +drawing-pad
    p Descopăr propoziții noi

//- -----------------------------------------------------------------

//- Complete word with parts

+exercise('U1L2-lucrez1')
  +statement
    p Completează cu silabe pentru a forma cuvinte.
  +compete-word('([a-z]+)să', true) //- regexp to match word -- used to validate solutions (ca)să, (ma)să, (le)să , 'true' validates against dictionary
  +compete-word('([a-z]+)să')
  +compete-word('ma([a-z]+)') //- matches ma(ma), ma(re), ma(roc)
  +compete-word('ma([a-z]+)')

//- -----------------------------------------------------------------

//- Order elements in sequence

+exercise('U1L3-lucrez3')
  +statement
    p Ordonează cuvintele de mai jos pentru a forma propoziții.
  +drag-and-sort()
    +item(3, 'în') //- vor
      p în
    +item(2)
      p intră
    +item(1)
      p Ana
    +item(4)
      p școală


//- -----------------------------------------------------------------

//- Match source - destination

+exercise('U1L5-lucrez2')
  +statement
    p
  +mix-and-match
    +item
      .source
        +image('para-malaiață');
      .destination
        p Pară
    +item
      .source
        +image('mar-padureț');
      .destination
        p Măr
    +item
      .source
        +image('mar-padureț');
      .destination
        p Măr


//- -----------------------------------------------------------------

//- Split word in pieces

+exercise('U2L11-lucrez2')
  +statement
    p Desparte printr-o linie cuvintele din propoziţiile de mai jos

  +split-letters('Pelicanul|e|mare.');
  +split-letters('Reli|are|un|cățel.');


//- -----------------------------------------------------------------

//- Complex full screen
//-
//- * Widget de colorat SVG (cu validare de culori)
//- * Silabe pe cartonașe care se combină în cuvinte reale
//- * Rebus cu background în spate
//- * Găsește cuvintele într-o matrice cu litere aleatoare
//- * Pune div-uri în găleți
//-

</pre>
