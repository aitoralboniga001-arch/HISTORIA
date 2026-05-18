import type { HistoryEvent, OrderingSet, TextSource, TrapRule } from './types';

export const texts = [
  {
    "id": "text-01",
    "number": 1,
    "title": "1812 Cadizko Konstituzioa",
    "date": "1812-03-19",
    "theme": "Estatu liberala",
    "body": "Fernando VII.a Jainkoaren graziaz eta Espainiako Monarkiaren Konstituzioaz Espainietako Errege denak, eta, haren faltan eta gatibutasunean, Gorte nagusiek eta bereziek izendatutako Erregetzako erregeordetzak, honako hau ikusi eta ulertzen duzuen guztioi zera jakinarazten dizue: Gorte berek honako hau agindu eta berretsi dutela: 1. artikulua. Espainiako Nazioa bi hemisferioetako espainiar guztien batasuna da. 3. art. Subiranotasuna Nazioan datza izatez, eta, arrazoi beragatik, nazioari bakarrik dagokio bere funtsezko legeak ezartzeko eskubidea. 8. art. Espainiar ororen betebeharra da Estatuaren gastuetan bere ondasunen arabera laguntzea. 12. art. Espainiako Nazioaren erlijioa katoliko, apostoliko eta erromatarra da eta izango da beti, egiazkoa den bakarra. Nazioak lege jakintsu eta bidezkoekin babesten du, eta beste edozein praktikatzea debekatzen du. 14. art. Espainiako Nazioaren gobernua monarkia moderatu heredagarria da. 15. art. Legeak egiteko eskumena Gorteek dute erregearekin. 16. art. Erregeak du legeak betearazteko ahalmena. 17. art. Auzi zibil eta kriminaletan legeak aplikatzeko eskumena legeak ezarritako auzitegiek dute. 371. art. Espainiar guztiek dute euren ideia politikoak idatzi, inprimatu eta argitaratzeko eskubidea, argitalpenaren aurreko lizentzia, berrikuspen edo onarpenik gabe, legeak xedatutako mugapen eta erantzukizunen pean. Cádizen, 1812ko martxoaren 19an"
  },
  {
    "id": "text-02",
    "number": 2,
    "title": "Persiarren Manifestua",
    "date": "1814-04-12",
    "theme": "Estatu liberala",
    "body": "JAUNA: Antzinako persiarren ohitura zen erregea hiltzen zenean anarkiaz beteriko bost egun igarotzea, hilketa, lapurreta eta beste hainbat zorigaiztoren esperientziek hurrengo erregearekiko leialago izatera behartu zitzan. Espainia Berorren Maiestateari leial izateko, ez zuen behar halako saiakuntzarik zure gatibutasunak iraun duen sei urteetan. Berorren Maiestatea arbasoen tronura itzulita ikusteaz pozten diren espainiarretatik, begirunezko adierazpen hau Espainiako ordezkari-izaerarekin sinatzen dutenak dira (...). Monarkia absolutua (...) arrazoiaren eta adimenaren lana da: jainkoaren legearen, justiziaren eta Estatuaren funtsezko legeen mende dago: konkista-eskubidearen bitartez edo euren erregeak aukeratu zituzten lehen gizakien borondatezko menekotasunaren bitartez ezarri zen. Horregatik, subirano absolutuak ez du ahalmenik bere agintea arrazoirik gabe erabiltzeko (Jainkoak berak ere eduki nahi izan ez zuen eskubidea); horregatik izan da beharrezkoa botere subiranoa absolutua izatea, bere mendekoei denen interesekoa zaintzen duena agintzeko eta hori nahi ez dutenak obeditzera behartzeko (...). Eskatu behar dugun erremedioa, gure botoak, eta gure probintzienak, paperean jarriz, Espainiako lege, foru, usadio eta ohituren araberakoa da. (...) Xede horrekin bil daitezela Gorteak handitasunez, eta antzinakoak egin ziren bezala (...): bertan behera utz daitezela Konstituzioaren ondorioak eta Cadizen xedatutako dekretuak, eta kontuan har ditzatela Gorte berriek euren deuseztea, injustizia eta desegokikeriak (...) Madrilen, 1814ko apirilaren 12an"
  },
  {
    "id": "text-03",
    "number": 3,
    "title": "Mendizabalen desamortizazio dekretua",
    "date": "1836-02-21",
    "theme": "Estatu liberala",
    "body": "BERORREN MAIESTATE ERREGINA GOBERNATZAILEARI EMANDAKO AZALPENA Andrea: Nazioaren jabego bihurtu diren ondasunak saltzea ez da soilik emandako hitza betetzea eta salmenten emaitzaren berdina den amortizazio baten bitartez zor nazionalari berme positiboa ematea; zorion publikoaren iturri oparo-oparo bat irekitzea da; hildako aberastasun bat berpiztea; industriaren eta zirkulazioaren kanaletako oztopoak kentzea; herrialdeari bertako gauza guztiekiko maitasun natural eta sutsua itsastea; aberria zabaltzea, aberriarekin bat egiteko lotura berri eta sendoak sortzea; azken batean, ordenaren eta askatasunaren ikurra den Isabel II.aren tronu gorenarekin identifikatzea da. Ez da merkataritzako espekulazio hotz bat, ezta kreditu-eragiketa bat ere (...); animazio, bizi eta zorioneko elementu bat da Espainiarako. Horrela azaldu badezaket, haren pizkunde politikorako osagarria da. Nazioak dagoeneko eskuratuak dituen ondasunen salmenta egiteko eta bere emaitza materialerako Berorren Maiestatearen onespen agurgarriaren pean jartzeko ohorea izango dudan dekretuak zor publiko handiaren kopurua murrizteko onura sortu behar du, eta beharrezkoa da bai bere joeran, bai bere helburuan eta bai emaitza hura lortzeko erabiliko dituen bitartekoetan, jabeen familia oparo bat sortzearen goi-mailako ideiari lotzea eta berarekin bat egitea, eta jabe horien gozamenak eta existentzia batez ere goi- mailako instituzioen erabateko garaipenean oinarritzea. Gaceta de Madrid , 1836ko otsailaren 21a"
  },
  {
    "id": "text-04",
    "number": 4,
    "title": "Burdinbideen Lege Orokorra",
    "date": "1855-06-03",
    "theme": "Estatu liberala",
    "body": "Isabel II.a (…) Espainiako Erregina: honako hau ikusi eta ulertzen duzuen guztioi jakinarazten dizue: Gorteek honako hau agindu dutela eta guk berretsi dugula: 4. art . Zerbitzu orokorreko trenbideen eraikuntza Gobernuak egiaztatu ahal izango du eta, bestela, partikularrek edo konpainiek. 6. art Partikularrek edo konpainiek ezingo dute trenbiderik eraiki (…) dagokion emakida eskuratu ez badute aurretik. 8. art Zerbitzu orokorreko trenbideak eraikitzeko funts publikoen laguntza jaso daiteke: a. Beraiekin obra jakin batzuk egikarituz; b. Enpresei aldi jakin batzuetan inbertitutako kapitalaren zati bat emanaz (…); c. Kapital horien truke gutxieneko interes edo interes finkoa bermatuz (…). 19. art . Trenbideen eraikuntzan erabiltzen diren atzerriko kapitalak edo xede horretarako maileguak estatuaren babespean eta gerraren ondoriozko errepresalia, konfiskazio edo bahimenduetatik libre geratuko dira. 20. art . Trenbide enpresa guztiei ematen zaizkie honako hauek: a. Trenbideak hartuko dituen jabari publikoko lursail guztiak (…); b. Auzotasuneko onura egur, larre eta gainerakoen aprobetxamendurako (…) enpresetako langileentzat eta lanetan erabiltzen diren garraioko animalien mantenurako; c. Trenbidearen aldameneko lurretan (…) harrobiak irekitzeko ahalmena (…); d. Bidesari eta garraio eskubideak (…) jasotzeko ahalmen esklusiboa; e. Eraikuntzak irauten duen bitartean eta hamar urte geroago arte, (…) lehengaiek, (…), makinek, (…), egurrak, kokeak eta atzerritik inportatu behar den material finko eta mugikor guztiak ordaindu beharreko muga zergan adierazitako eskubideen baliokidea ordaindu beharra (…) 30. art . Trenbideak honako baldintza hauen arabera eraikiko dira: a. Trenbidearen zabalera metro bat eta 80 zentimetrokoa izango da (Gaztelako 6 oin eta 6 hazbete). Aranjuezen, 1855eko ekainaren 3an Ni, Erregina.- Francisco de Luxan, Sustapen Ministroa Gaceta de Madrid, 1855eko ekainaren 6a"
  },
  {
    "id": "text-05",
    "number": 5,
    "title": "1839ko urriaren 25eko legea",
    "date": "1839-10-25",
    "theme": "Foruak",
    "body": "Isabel II.a Jainkoaren Graziaz eta Espainiako Monarkiaren Konstituzioaz Espainietako Erregina denak eta, haren adingabetasunean, haren Ama Agurgarria den Maria Cristina Borboikoa Erregina alargunak, Erresumako Erregina Gobernatzaileak, honako hau ikusi eta ulertzen duzuen guztioi jakinarazten dizue: Gorteek honako hau agindu dutela eta neronek berretsi dudala: 1. art. Euskal probintzietako eta Nafarroako Foruak berresten dira, monarkiaren batasun konstituzionalari inolako kalterik eragin gabe. 2. art. Gobernuak, aukera izan bezain laster eta euskal probintziei eta Nafarroari entzun ondoren, lehen aipatutako Foruetan haien interesa aldarrikatzen duen nahitaezko aldaketa proposatuko dio Gorteei, Nazioaren eta Monarkiaren Konstituzioaren interes orokorrarekin bat eginez eta, aldi baterako eta lehen adierazitako moduan eta zentzuan, sor litezkeen zalantzak eta eragozpenak ebatziz eta Gorteei horren berri emanaz. Nik, Erregina gobernatzaileak.- Erreginak eskuz sinatuta – Jauregian, 1839ko urriaren 25ean"
  },
  {
    "id": "text-06",
    "number": 6,
    "title": "1876ko uztailaren 21eko legea",
    "date": "1876-07-21",
    "theme": "Foruak",
    "body": "Alfonso XII.a Jainkoaren Graziaz Espainiako Errege konstituzionala denak honako hau ikusi eta ulertzen duzuen guztioi zera jakinarazten dizue: Gorteek honako hau agindu dutela eta nik berretsi dudala: 1. artikulua. Legeak deitutakoan arma zerbitzura joateko eta norberaren ondasunen proportzioan Estatuko gastuetan laguntzeko betebeharrak ezarri dizkie Konstituzio politikoak espainiar guztiei, eta betebehar horiek, eskubide konstituzionalak diren heinean, Bizkaiko, Gipuzkoako eta Arabako biztanle guztiei ezarriko zaizkie, Nazioko gainerako biztanleei bezalaxe. 2. artikulua. Aurreko artikuluan xedatutakoaren arabera, aipatutako hiru probintziak behartuta daude (...), kintoetan eta ejertzitoko garai arruntetan eta berezietan, Legeen arabera dagokien gizon kopurua aurkeztera. 3. artikulua. Era berean, (...) Bizkaiko, Gipuzkoako eta Arabako probintziak behartuta daude Estatuko aurrekontu orokorretan esleitutako kontribuzio, errenta eta zerga arrunt eta bereziak ordaintzera, dagokien proportzioan, gastu publikoetarako. 4. artikulua. Gobernuari baimena ematen zaio, dagokion egunean Gorteei berri emanez eta 1837ko irailaren 19ko eta 1841eko abuztuaren 16ko legeak eta urte bereko urriaren 29ko dekretua kontutan hartuz, Araba, Gipuzkoa eta Bizkaizko probintzien onespenarekin, egokitzat jotzen badu, euskal herrien ongizateak nahiz nazioaren gobernu onak eta segurtasunak eskatzen dituzten erreformak haien foru-araubide zaharrean adosteari ekiteko. Jauregian, 1876ko uztailaren 21ean.- Nik, Erregeak- Antonio Canovas del Castillo Ministro Kontseiluko Presidentea. Gaceta de Madrid , 1876ko uztailaren 25ean"
  },
  {
    "id": "text-07",
    "number": 7,
    "title": "1876ko Konstituzioa",
    "date": "1876-06-30",
    "theme": "Berrezarkuntza",
    "body": "1876ko KONSTITUZIOA Alfontso XII.a Jainkoaren graziaz Espainiako Errege konstituzionala denak honako hau ikusi eta ulertzen duzuen guztioi zera jakinarazten dizue: egun bilduta jarraitzen duten Erresumako Gorteekin batera eta haiekin bat etorriz, honako hau agindu eta berretsi dudala: Espainiako Monarkiaren Konstituzioa 11. art. Erlijio Katoliko, Apostoliko eta Erromatarra Estatuaren erlijioa da. Nazioa haren kultua eta haren ministroak mantentzera behartuta dago. Espainiako lurraldean ezingo da inor molestatu ez bere iritzi erlijiosoengatik ez bere kultua praktikatzeagatik, baldin eta kristau moralari zor zaion errespetua gordetzen bazaio. Ez dira baimenduko, ordea, Estatuaren erlijioarenak ez diren jendaurreko zeremonia eta adierazpenak. (...) 13. art. Espainiar orok du eskubidea: Bere iritzi eta ideiak askatasunez adierazteko, ahoz, idatziz, inprimaketaz edo antzeko beste prozedura batez baliatuz eta aurretiko zentsurari lotu gabe. Bakean biltzeko. Giza bizitzaren xedeetarako elkartzeko (...). 18. art. Legeak egiteko ahalmena Gorteek dute Erregearekin. 19. art. Gorteak ahalmen bereko bi gorputz legegilez osatuta daude, gaitasun berberak dituztenak: Senatua eta Diputatuen Kongresua. 20. art. Senatua honela osatuta dago: norberaren eskubideko senatariak; Koroak izendatutako biziarteko senatariak; Estatuko korporazioek eta zergapeko handiek hautatutako senatariak (...). 28. art. Legeak finkatzen duen metodoaren bitartez hautatu eta berrautatu ahal izango dira diputatuak (...). 50. art. Erregeak du legeak betearazteko eskumena (...). 75. art. Kode berberek aginduko dute monarkia osoan, zirkunstantzia jakin batzuen ondorioz legeek xedatzen dituzten aldaketak egin ahal izango badira ere. Epaiketa arrunt, zibil eta kriminaletan, foru bakarra ezarriko da espainiar guztientzat (...). Madrilen, 1876ko ekainaren 30ean"
  },
  {
    "id": "text-08",
    "number": 8,
    "title": "Joaquin Costaren Oligarquía y caciquismo lanaren pasartea",
    "date": "1901",
    "theme": "Berrezarkuntza",
    "body": "Horren bitartez, gobernu mota hau osatzen duten faktoreak eta bakoitzak gainerakoekiko okupatzen duen posizioa erabakitzen ditugu. Hiru dira kanpoko osagai horiek: 1. Bando bakoitzeko oligarkak (primate deiturikoak), gizon itzaltsuak edo gailenak, haren \"buruzagitza\" osatzen dutenak eta, oro har, erdialdean bizi direnak; 2. Lehen, bigarren edo hurrengo mailako jauntxoak , lurraldean sakabanatuak; 3. Gobernadore zibila , haien komunikazio-organo eta tresna den pertsona. Funtsean, horixe da trikimailu guztia, bere zamaren azpian nazioa amore emanda, intzirika eta etzanda daukana. Oligarka eta jauntxoek osatzen dute klase gidari edo gobernatzaile deitzen dioguna eta 'alderditan' banatuta eta sailkatuta dagoena. Baina hala deitzen badiogu ere, ez da hala; hala balitz, nazioaren zati eta haren ordezkari organiko izango litzateke. Baina gorputz arrotza baino ez da, zergak ezarri eta kobratzearren ministerioak, kapitaintzak, telegrafoak, trenbideak, bateriak eta gotorlekuak indarrez hartutako atzerritar talde bat izango litzatekeen bezala. Hauteskundeetan (...), ez da herria bozketa faltsifikatu eta sistema galbidera eramaten duena, klase kontserbadoreak eta gobernatzaileak baizik. Horretarako, euren posizioaz, aberastasunaz eta masak zuzentzeko eman zitzaien aginteaz eta botereaz baliatzen dira. Joaquin Costa, Oligarquía y caciquismo como la forma actual de gobierno en España , Madril, 1901"
  },
  {
    "id": "text-09",
    "number": 9,
    "title": "Federico Etxeberriaren hitzaldia librecambismoari eta protekzionismoari buruz",
    "date": "1893-12-09",
    "theme": "Industrializazioa",
    "body": "Ez, hemen gertatzen den gauza bakarra zera da, Espainiaren eta Alemaniaren artean proiektuan den itun tamalgarriaren ondorioz, atzera botako dela, eta deseginik geldituko dela egungo aduana-zergen araubidea ezartzeko egindako lan handia. Eta jokabide horrek zoritxar handia ekarriko dio herrialdeari, dudarik gabe; ez bakarrik aurrekari zorigaiztoko bat ezarriko duelako, etorkizuneko edozein industria-ekimen hondatuko lukeena, baizik eta, orobat, zauri hilgarria eragingo liekeelako lantegiei; bai egungo muga-zergen araubidearen babesean altxatu direnei, halakoak baitira gehien-gehienak, baita lehendik altxatuak zirenetan egin diren erreforma eta zabaltze handiei ere. Eta industria-jarduera horren guztiaren heriotzak, ohar gaitezen, hauek guztiak harrapatuko lituzke: Labe Garaiak, galdaragintzako eta makinak egiteko instalazio berrietan: altzairu-ekoizpena; Talleres de Deusto, altzairu moldekatuak eta trakzio-makinak eta -materiala egiteko sailean; Aurrera, haren hodi-fundizio ezin garrantzitsuagoetan, altzairuzko manufakturetan; Talleres de Zorroza eta Talleres de Miraballes, zubigintzan, bagoigintzan, eraikuntzan eta galdaragintzan (...) eta beste asko eta asko, luze joko bailiguke orain denak aipatzeak. Ez aipatzeagatik, jaun-andreok, berebiziko garrantzia duten fabrika-proiektuak —izenik ezin dut eman—, 1892ko aduana-zergak jarraitzearen baitan baitago haiek gauzatzea edo ez. Hain ondorio lazgarriak saihesteko, hainbesteko hondamena saihesteko, Bizkaia ez ezik Espainiako beste eskualde oso garrantzitsu batzuk ere hartuko bailituzke eta eragina izango bailuke nazio osoan, tinko eskatu behar diogu Gobernuari ez dadila urrundu araubidetik, ez dezala suntsitu halako modu zalapartatsu eta gupidagabean gaur egungo babes-sistema, eta, beraz, bazterrera utz dezala espainiar-alemaniar itun zentzugabe hori. Merkataritza Itunen kontrako mitin-protesta, Bilbon, 1893ko abenduaren 9an . Bilbon, 1894"
  },
  {
    "id": "text-10",
    "number": 10,
    "title": "Vicente Blasco Ibañezen El intruso eleberriaren pasartea",
    "date": "1904",
    "theme": "Industrializazioa",
    "body": "“Peoien etxea” zen, meatze-mendietako aterpetxe ziztrina, eta jornalariak han bizi ziren, pilatuta. (...) Arestik zulo hartan igarotako gauetan pentsatu zuen, tristuraz beteta. Peoiak abailduta iristen ziren, egun osoa ematen baitzuten barrenatzeko makinek ateratako blokeak apurtzen, bagonetak harritzarrez betetzen, mea-biltegira eramaten eta mea-biltegitik ekartzen. Babarrunak eta patatak bakailao edo urdail pixka batekin eskas afalduta, gelaxka hartan egiten zuten lo, izerdiz edo euriz bustitako jantziak soinean zituztela; botak bakarrik eranzten zituzten; jaka ere bai, batzuetan. Eskuez uki zitekeen sabai haren azpian, airea ez zen mugitzen, eta ordu gutxi batzuk igaro ostean, ezin arnastuzkoa bilakatzen zen, hainbeste gorputzen lurrunak loditua eta zikinkeria-usainez josia. Kamainen tolesetan, egurrezko junturetan nahiz sabaiko zuloetan bizi ziren bizkarroiak ehizara ateratzen ziren, beroak suspertuta, eta nekeak eraginda lozorroan zeuden gorputz bizigabeekin anker jokatzen zuten, iluntasunaren babesean. Gau ekaiztsuetan, zirrikitu eta arrailetatik sartu eta batetik bestera ibiltzen zen haizea, etxezuloa behera botatzeko zorian. Halakoetan, gorputz jantzi eta kirasdunak elkarren bila aritzen ziren, beroa lortu nahian. Izerdiak elkartu egiten ziren, eta arnasak nahasi; zikinkeria anaiartekoa zen. (...) Vicente Blasco Ibáñez, El Intruso , Valentzia, 1904"
  },
  {
    "id": "text-11",
    "number": 11,
    "title": "Euskeldun Batzokijaren estatutuak",
    "date": "1894",
    "theme": "Nazionalismoa",
    "body": "1. artikulua: Euskeldun Batzokija izenarekin sortzen da Bilboko hirian aisiarako zentro bat, helburu duena (...) Bizkaiko Jaun Goikua eta Lagi-Zarra goiburuan jasotako doktrinen jarraitzaile diren herritarren arteko batasun- eta adiskidetasun-loturak sortzea. 2. artikulua: Behin Bizkaiko Elkarte Nagusia sortzen denean, Bizkai-Batzar deituko dena eta Arana eta Goiri ́tar Sabinok idatzitako estatutuak izango dituena, Euskeldun Batzokija haren mende geratuko da (...). 3. artikulua: Jaungoikua. Bizkaia katolikoa, apostolikoa eta erromatarra izango da bere barruko bizitzako adierazpen guztietan eta gainerako herriekiko harremanetan. 4. artikulua: Lagizarra. Bizkaia askatasunez birsortuko da. Bere lege tradizionaletan, foruetan, jasotako funtsezkoena osotasunean berrezarriko du. Gure arbasoen usadio eta ohitura onak berrezarriko ditu. Euskal arrazako familiez osatuko da gehienbat, erabat ez bada. Euskara izendatuko du hizkuntza ofizialtzat. 5. artikulua: Eta. Ordena erlijiosoaren eta politikoaren eta gauza jainkotiarren eta gizatiarren arteko harmonia perfektuaren eta adostasunaren gainean ezarriko da Bizkaia. 6. artikulua: Jaungoikua eta Lagizarra bereiztea. Ordena erlijiosoaren eta politikoaren, eklesiastikoaren eta zibilaren arteko bereizketa argi eta nabarmenaren gainean ezarriko da Bizkaia. 7. artikulua: Jaungoikua Lagizarraren aurretik jartzea. Politikoa erlijiosoarekiko eta Estatua Elizarekiko erabateko eta baldintza gabeko mendekotasunaren gainean ezarriko da Bizkaia. 8. artikulua: Bizkaia, bere arraza, bere hizkuntza, bere fedea, bere izaera eta bere ohiturak kontuan hartuta Araba, Nafarroa Beherea, Gipuzkoa, Lapurdi, Nafarroa eta Zuberoaren senide izanik, sei herrialde horiekin elkartu edo konfederatuko da Euskelerria (Euskeria) izeneko osotasuna eratzeko, baina bere autonomia partikularra batere murriztu gabe (...). Bizkaitarra (Bilbo), 1894-05-24"
  },
  {
    "id": "text-12",
    "number": 12,
    "title": "La Lucha de Clases astekariko artikulua",
    "date": "1896-05-23",
    "theme": "Langile-mugimendua",
    "body": "Bizkaiko Langileei (...) Bizkaiko meatzeetako langileek, maiatzaren 1ean Gallartako frontoian bildurik, manifestazio zaratatsuak egin zituzten meatze eskualde hartako erregetxoek derrigorrezko kuartel eta dendak mantentzearen aurka, eta batzorde bat eratu zuten botere publikoei edo haien ordezkariei haiek berehala eta erabat desagerrarazteko. (...) Meatzeetako langileak bat eginik altxatu ziren greban 1890ean, lanaldia murriztea eta derrigorrezko barrakoi eta dendak kentzea aldarrikatuz. (...) Gaur egun, nola edo hala, 1890ean ezarritako lanaldiari eusten zaio, baina derrigorrezko barrakoi eta dendei dagokienez, lehenengo grebaren aurrean bezala dago egoera, oso-oso alde txikiarekin, meatze-zona guztian. Bizkaian, legeak gutxietsiz eta mendearen izaera liberala murriztuz, nahitaezko baldintza da, lanean onartua izateko, etxe ez-higienikoetan bizitzea eta janaria, ona edo txarra (ia beti txarra eta eskandaluzko prezioan), denda jakin batzuetan erostea. Hori, gure iritziz, hainbestetan ahoan hartutako lan-askatasunari egiten zaion eraso larri bat da, osasun eta higiene legeei egiten zaien irain bat da, eta, batez ere, inongo gobernu kultuk onartu behar ez lukeen zapalkuntza antihumanitario bat da. Baina Bizkaiko meatzeetako langileek, esklabotasun berri eta higuingarriaren ikur diren derrigorrezko kuartel eta dendak desagerrarazteko, grebarako legezko eskubidea aldarrikatuko dute, baldin eta gobernuak eta agintariek uste ez badute benetako krimenak egiten dituzten kontzientziarik gabeko zapaltzaileen aseezintasunari muga jarri behar zaionik. La Lucha de Clases (Bilbo), 1896-05-23"
  },
  {
    "id": "text-13",
    "number": 13,
    "title": "Clara Campoamor diputatuak Gorte Konstituziogileetan emandako hitzaldia",
    "date": "1931-09-01",
    "theme": "II. Errepublika",
    "body": "Utz iezaiozue emakumeari den bezalakoa agertzen, hura ezagutu eta epaitzeko; errespeta ezazue gizaki izateagatik duen eskubidea; (...) eta baldin eskubide konstituziogilea, herri zibilizatuen arau juridiko gisa, gero eta hurbilago badago askatasunaren kontzeptutik, ez iezaguzue arrazoitzat aipa izaki desberdinen arteko desberdintasunaren printzipio aristoteliko zaharkitua (...). Utz iezaiozue emakumeari Zuzenbidean aritzen, hasieran hanka-sartzeak eta zalantzak izanda ere, horrela bakarrik heziko baita hartan. (...) Konstituzio honen garaia eta espiritua kontuan hartuta, asko poztu nau pentsatzeak mundu zibilizatuko orain arteko konstituziorik onena, libreena eta aurreratuena izango dela. Eta pentsatu dut, halaber, Errepublika ezarri eta hamabost egunera behin-behineko Gobernuaren dekretuak monarkiaren menpe egon garen aurreko hogei mendeek aitortu ez ziotena aitortuko diotela emakumeari. Uste dut hau izango dela emakumearen [sufragio] eskubidea onartuko duen lehen latindar herrialdea; lehen aldiz entzungo da latindar ganbera batean emakumearen ahotsa, emakumea bera bezain xumea, baina egiaren haizeak ekarri nahi dizkiguna; eta harro-harro sentitzen naiz, nire Espainia izango baita emakumearen askatasunaren bandera jasoko duen herrialdea (...). Eta honela diotsuet, legegile jaunak: (...) ez ezazue onar beste latindar nazio batek, datozen egunetan, guk baino lehenago ezartzea bere Konstituzioaren buruan emakumearen askatasuna, zuen kidearen askatasuna. Espainiako Errepublikaren Gorte Konstituziogileen saioen egunkaria ; 1931ko irailaren 1eko saioa"
  },
  {
    "id": "text-14",
    "number": 14,
    "title": "Fronte Popularraren programa",
    "date": "1936-01-16",
    "theme": "II. Errepublika",
    "body": "Alderdiak (…) berehala izango den hauteskunde lehian euren indarren koalizioari oinarri eta kartel gisa balioko dien plan politiko komuna adostera iritsi dira. (…) Koalizioan elkartutako alderdiek honako konpromiso hauek hartu dituzte: Lege baten bitartez, 1933ko azaroaz geroztik egindako delitu politiko eta sozialen amnistia zabala ematea, auzitegiek halakotzat jo ez bazituzten ere (...). Askatasunaren eta justiziaren defentsan, Estatu errepublikanoaren eta haren erregimen konstituziogilearen funtsezko misio gisa, koalizioan elkartutako alderdiek Konstituzioaren agintea berrezarriko dute. (...) Errepublikazaleek ez dute onartzen lurra nazionalizatu eta nekazariei emateko printzipioa, alderdi sozialistako ordezkariek eskatua. Baina bestalde, begi onez ikusten dituzte nekazariak askatzeko ezarri daitezkeen zenbait neurri (...). Alderdi errepublikazaleek ez dituzte onartzen langile-alderdiek bankuak nazionalizatzeko proposatutako neurriak; baina, bestalde, onartzen dute gure banku-sistemak hainbat hobekuntza behar dituela (...). Alderdi errepublikazaleek ulertzen duten Errepublika ez da klase-arrazoi sozial edo ekonomikoek zuzendutako errepublika bat, interes publiko eta aurrerapen sozialeko arrazoiek bultzatutako askatasun demokratikoko erregimen bat baizik. Baina, arrazoi ausart horrexegatik, politika errepublikazaleak produkzioaren interes orokorrak uzten duen muga goreneraino igo behar lituzke langileen baldintza moralak eta materialak, muga horretatik kanpo pribilegio sozial eta ekonomiko guztiei ezarri beharreko sakrifizioak direnak izanda ere. Alderdi errepublikazaleek ez dute onartzen alderdi sozialistaren ordezkaritzak eskatutako langile-kontrola. El Socialista (Madril), 1936ko urtarrilak 16a"
  },
  {
    "id": "text-15",
    "number": 15,
    "title": "Euskal Herriko Autonomia Estatutua",
    "date": "1936-10-04",
    "theme": "Gerra Zibila",
    "body": "Diputatuen Kongresuak honako LEGE hau agindu eta berretsi du: 1. art. Errepublikako Konstituzioaren eta Estatutu honen arabera, Arabak, Gipuzkoak eta Bizkaiak eskualde autonomoa osatzen dute espainiar estatuaren barruan eta “Euskal Herria” izena hartu du. Bere lurraldea aipatutako probintziek gaur egun osatzen dutena izango da eta horiek, aldi berean, modu autonomoan gobernatuko dira (…). Euskara, gaztelania bezala, Euskal Herriko hizkuntza ofiziala izango da (…). 5. art. Euskal Herriari dagokio bere lurralde autonomoaren barruko babes juridikorako eta ordena publikoa mantentzeko polizia erregimena ezartzea. 10. art. Euskal Herriaren botereak herrian sortzen dira eta Errepublikako Konstituzioaren eta Estatutu honen arabera erabiliko dituzte berak erabakitzen dituen organoek honako mugapen hauen arabera: a. Eskualdeko organo legegilea (…) sufragio unibertsal, berdin, zuzen eta sekretu bidez (…) hautatuko da. b. Organo betearazleak organo legegilearen konfiantza izan behar du eta presidentea izango da eskualdearen ordezkaria Errepublikarekiko harremanetarako (…). Lehen xedapen iragankorra. Gerra zibilak eragindako ez ohiko baldintzek irauten duten bitartean, Euskal Herrian behin-behineko Gobernuak aginduko du Estatutu honetan xedatutako eskumen guztiekin. Behin-behineko Gobernu horretako lehendakaria Estatutua promulgatu ondorengo zortzi egunen barruan izendatuko dute euskal udalak osatzen dituzten eta euren botoa askatasunez eman dezaketen herriak aukeratutako zinegotziek (…). Behin-behineko Gobernuko lehendakariaren hautaketa Bizkaiko gobernadore zibilak egiaztatuko du (…). Horrela hautatutako lehendakariak behin-behineko Gobernuko kideak izendatuko ditu eta horiek ez dira bost baino gutxiago izango (...) Gaceta de Madrid , 281. alea, 1936ko urriaren 7koa. Euskal Herriko Agintaritzaren Aldizkariaren 1. alea, 1936ko urriaren 9koa"
  },
  {
    "id": "text-16",
    "number": 16,
    "title": "Bizkaian eta Gipuzkoan kontzertu ekonomikoak ezeztatzeko lege-dekretua",
    "date": "1937-06-23",
    "theme": "Gerra Zibila",
    "body": "Euskal probintzietan ekonomia arloan indarrean dagoen sistema itunduak pribilegio nabarmena du erregimen arruntari lotutako gainerako lurralde nazionalarekiko, ez probintzia horietako aldundiek arlo horretan duten autonomia zabalagatik bakarrik, baizik eta probintzia horietako zergapekoak karga publikoak altxatzeko egiten duten ahalegin txikiagoagatik (...). Kontzertua mesedegarri izan zuten askok botere publikoaren eskuzabaltasuna ahazturik, Gipuzkoan eta Bizkaian, armak hartu zituzten uztailaren 17an abiarazitako Mugimendu Nazionalaren aurka, eta traizioz erantzun zioten salbuespenezko eskuzabaltasun hari (...). Zerga eta administrazio erregimenaren berezitasunak bere sentimendu nazionala eta Aberriaren patu komunarekiko atxikipenaren suhartasuna gero eta gehiago goraipatzeko balio izan du probintzia batzuetan, hala nola Nafarroa txit leialean. Beste batzuetan, aldiz, Espainiaren aurkako politika guztiz baldarra egiteko balio izan du; horiek horrela (...), amaiera eman behar zaio kalte larriak eragiteko tresna gisa erabili zuten sistema horri. Gogoeta beren arabera, Arabako probintzian gaur egun indarrean dagoen sistemak jarraitu egin behar du (...). Horren kariaz, honako hau xedatzen dut: Lehen artikulua. Datorren uztailaren batetik aurrera, Estatuko kontribuzio, errenta eta zerga arrunt eta berezi guztien kudeaketa eta bilketa indarrean dagoen erregimen komunaren arabera egingo da Gipuzkoa eta Bizkaia probintzietan (...). Beraz, indargabetuta geratuko da, lehen adierazitako datatik aurrera, haien aldundiekin itundutako eta gaur egun indarrean zegoen ekonomia arloko erregimena. Burgosen, 1937ko ekainaren 23an . Francisco Franco Boletín Oficial del Estado, 1937ko ekainaren 24koa"
  },
  {
    "id": "text-17",
    "number": 17,
    "title": "Erantzukizun Politikoaren Legea",
    "date": "1939-02-13",
    "theme": "Frankismoa",
    "body": "Gobernuak (...) uste du unea iritsi dela Erantzukizun Politikoen Lege bat emateko, balioko duena beren egite edo ez-egite larriekin matxinada gorria gorpuzten lagundu zutenek alde horretatik dituzten erruak garbitzeko (...). Zigorrak ezartzeaz arduratuko diren auzitegietako kideak Armadaren, Magistraturaren eta Falange Española Tradicionalista y de las JONSen ordezkariak izango dira (...). 1 art. Erantzule politiko deklaratzen dira 1934ko urriaren 1etik 1936ko uztailaren 18ra bitarte Espainiari jasanarazi zitzaion era guztietako subertsioa eragiten edo areagotzen lagundu zuten pertsona fisikoak nahiz pertsona juridikoak, eta orobat bigarren data horretatik aurrera, beren egintza batzuekin edo gelditasun larriarekin, Mugimendu Nazionalaren kontra aritu direnak edo daudenak. 2. art. Aurreko deklarazioaren ondorioz (...) legez kanpo gelditzen dira 1936ko otsailaren 16an egindako hauteskundeen deialdia egin zenez geroztik Fronte Popularra osatu duten alderdi edo talde politiko eta sozial guztiak, eta orobat harekin bat egin duten edo hari atxiki zaien alderdi eta taldeak hori egin izan hutsagatik, erakunde separatistak eta Mugimendu Nazionalaren Garaipenari kontra egin dioten guztiak. 3. art. Legez kanpo deklaratutako alderdi, talde eta erakundeek osotara galduko dituzte era guztietako eskubideak eta ondasun guztiak. Boletin Oficial del Estado , 1939ko otsailaren 13a"
  },
  {
    "id": "text-18",
    "number": 18,
    "title": "Nazio-intereseko industriak babesteko legea",
    "date": "1939-10-25",
    "theme": "Autarkia",
    "body": "Espainiak bere historiako krisirik larriena gainditu behar izan zueneko Gurutzada loriatsuan, agerian gelditu zen nazioaren bizitzarako zeinen garrantzi handikoa den gerrarako behar dituen industriak eta ezinbesteko lehengaiak bere lurraldean izatea. Gure ekonomia dagoen egoeran egonik, bestalde, beharrezkoa da ahaleginak egitea Espainia produktu arrotzen inportaziotik askatzeko, halakoak gure nazioaren lurraldean ekoitzi edo fabrikatu daitezkeenean. Gaur arte lortu ez denez, barne-merkatuak aukera emanik ere, ekimen partikularraren bidez premia horiek asetzea, komeni da nazioaren interes bereziko diren halako industriak ezartzeko laguntza ematea, funtzionamendu normala ziurtatuko dieten bermeak eta onurak eskainiz. Hori dela eta, hau XEDATZEN DUT: 1. art. Nazioaren defentsaren edo ekonomiaren premien ondorioz beharrezko ikusten bada Espainian industria bat ezartzea, eta hartarako ekimen partikularra sustatu beharra baldin badago, “nazio-intereseko” deklaratu ahal izango da industria hori, dagozkion txosten tekniko eta ekonomikoak egin ondoren. 2. art. “Nazio-intereseko” deklaratutakoan, industria batek honako onura hauetaz gozatu ahal izango du, hamabost urterainoko epean: a) Industria hori jartzeko behar diren lurrak nahitaez desjabetzeko ahalmena. b) Zergak murriztea, % 50eraino. c) Estatuak haren kapitalari urteko gutxieneko etekin bat bermatzea, % 4rainokoa. Atal honen arabera bermatutako kapitala ezin izango da, guztira, mila milioi pezeta baino gehiago izan. d) Aduana-eskubideetan beherapena egitea instalazioetarako makineria eta lanabesak inportatzean, Espainian fabrikatzen ez direnean. 3. art. Onura horien trukean, estatuak esku hartuko du industria ezartzean eta haren martxan, kontu-hartzaile bat eta kontseilari-ordezkari bat izendatuta, egintzak eteteko ahalmena izango dutenak; aukera izango du, orobat, instalazioak bere teknikariekin balioesteko. 6. art. Enpresa emakidadunek, sozietatearen egonkortasuna eta martxa ekonomikoa ziurtatutakoan, onurei uko egin ahal izango die, eta, orduan, hirugarren artikuluan adierazitako esku-hartzetik libre geldituko da. Boletín Oficial del Estado, 1939ko urriaren 25a"
  },
  {
    "id": "text-19",
    "number": 19,
    "title": "Europako Mugimenduaren Kongresuaren Municheko erabakia",
    "date": "1962-06-08",
    "theme": "Oposizioa",
    "body": "EUROPAKO MUGIMENDUAREN KONGRESUAK 118 ORDEZKARI ESPAINIARREN PROPOSAMENEZ MUNICHEN HARTUTAKO ERABAKIA. (1962-06-07/08) Europar Mugimenduaren Kongresuak, Munichen 1962ko ekainaren 7an eta 8an bilduta, iritzi dio edozein herrialdek Europan sartu nahi badu, izan atxikita edo izan elkartze bidez, herrialde horrek erakunde demokratikoak izan beharko dituela; horrek, Espainiaren kasuan, Gizakiaren Eskubideei buruzko Europar Konbentzioaren eta Europako Gizarte Gutunaren arabera, hau esan nahi du: 1. Benetan ordezkaritza bidezkoak eta demokratikoak diren erakundeak eratzea, zeinek bermatzen baitute gobernua herritarren onespenean oinarritzen dela. 2. Pertsonen eskubide guztiak egiazki bermatzea; bereziki, norberaren askatasunari eta adierazpen-askatasunari buruzkoak, gobernuaren zentsurarik gabe. 3. Erkidego naturalen izaera berezia aitortzea. 4. Askatasun sindikalak oinarri demokratikoen gainean baliatu ahal izatea eta langileek beren oinarrizko eskubideak defendatu ahal izatea; besteak beste, greba eskubidearen bidez. 5. Iritzi-korronteak eta alderdi politikoak antolatzeko aukera izatea, oposizioaren eskubideak aitortuta. Kongresuak itxaropen sendoa du aurreko oinarri horien araberako eboluzioak aukera emango duela Espainia Europan sartzeko, haren funtsezko osagaia baita; eta adierazgarritzat dauka Kongresuan partaide izan diren espainiar ordezkari guztiek adierazi izana seguru daudela espainiar ordezkari gehienek nahi dutela eboluzio hori zuhurtzia politikoaren arauen arabera egitea, egoerak aukera ematen duen bezainbesteko azkartasunarekin, denen zintzotasunarekin eta eboluzio-prozesuaren aurretik, prozesuan bertan nahiz prozesuaren ondoren bortxakeria aktibo nahiz pasiboari uko egiteko konpromisoarekin. Munich (Alemaniako Errepublika Federala), 1962ko ekainaren 8a"
  },
  {
    "id": "text-20",
    "number": 20,
    "title": "Estatuaren Lege Organikoa",
    "date": "1967-01-11",
    "theme": "Frankismoa",
    "body": "Orain arte promulgatutako legeek erakunde antolamenduek behar duten gai gehienak hartzen dituzte.(…). Iritsi da estatu nazionalaren erakundetzea amaitzeko une egokia (…). Horren kariaz, (…), honako hau xedatzen dut: 1. art. Espainiar estatua, erresuma gisa eratutakoa, erkidego nazionalaren erakunde gorena da. 2. art. I. Subiranotasun nazionala bakarra eta zatiezina da eta ezin da ez ordezkatu ez laga. II. Espainiar estatuaren erakunde sistema botere-batasunaren eta funtzio koordinazioaren printzipioetan oinarritzen da. 3. art. Honako hauek dira estatuaren oinarrizko xedeak: Espainiako gizakien arteko eta lurren arteko batasunaren defentsa; Nazioaren osotasuna, independentzia eta segurtasuna mantentzea (…). Hori guztia Mugimendu Nazionalaren Printzipioen inspirazioarekin eta haiekiko leialtasun zorrotzenarekin (…) printzipio hoiek, beren izaeragatik beragatik, iraunkorrak eta aldaezinak baitira. 6. art. Estatuburua nazioaren ordezkari gorena da; nazio-subiranotasuna pertsonifikatzen du; botere politiko eta administratibo gorena erabiltzen du; Mugimenduaren Buruzagitza Nazionala du, eta Mugimenduaren eta Erresumako gainerako Funtsezko Legeen printzipioak zorrotz betetzen direla zaintzen du (…); legeak promulgatu eta berresten ditu (…); lurreko, itsasoko eta aireko armaden gaineko aginte gorena du; (…); haren izenean administratzen da justizia; grazia- eskubidea erabiltzen du; enpleguak, kargu publikoak eta ohoreak ematen ditu, legeek xedatutakoaren arabera; ordezkari diplomatikoak akreditatu eta hartzen ditu, eta Erresumako Funtsezko Legeen arabera dagozkion ekintza guztiak egiten ditu (...) 14. art. Gobernuburuak espainiarra izan behar du eta estatuburuak izendatuko du Erresumako Kontseiluak proposatutako hirukote batetik hautatuta. Boletín Oficial del Estado, 1967-01-11"
  },
  {
    "id": "text-21",
    "number": 21,
    "title": "Baionako Hitzarmena",
    "date": "1945-03-31",
    "theme": "Erbestea",
    "body": "Euzkadik Frantzian dituen erakunde politiko eta sindikalek, zeinak, Euzkadiko Gobernuarekin batuta, Francok zuzendutako matxinada-mugimenduaren aurka heroikoki borrokatu baitziren, honako hau adierazi nahi dute, etorkizunari begira bakoitzak dituen berezitasun ideologikoei uko egin gabe eta hipotekatu gabe: 1. Berretsi egiten dutela altxamendu militarra zela-eta 1936ko uztailaren 18an abiarazitako ekintza gauzatzeko indar-batzea. Batura hura era organikoan islatuta geratu zen 1936ko urriaren 7an, Euzkadiko Gobernua osatu zenean, Jose Antonio Agirre jaun txit gorenaren lehendakaritzapean, Errepublikako Gorteek bozkatutako Estatutuaren arabera. 2. Gobernu horretan konfiantza osoa dutela eta beharrezko laguntza eskainiko diotela, euskal herriaren bidezko ordezkari gisa, baldin eta haren helburu politiko eta sozialak jasotzen baditu. 3. Normaltasun demokratikoa berriz ezarritakoan euskal herriak askatasunez adieraziko dituen nahiak errespetatu eta defendatuko dituztela. 4. Euzkadiko Gobernuak egin beharreko lanean aholkua eman eta lan hori prestatu eta babestuko duen erakunde aholku-emaile bat eratuko dutela gerraren ondorioz euskal lurraldetik kanporatu dituen erregimen antidemokratikoa erortzea lortutakoan. Erakunde horren funtzionamendua araudi egoki baten bidez arautuko da. 5. Penintsulako herri, alderdi politiko eta erakunde sindikal guztiekin batera borrokan jarraituko dutela, arlo guztietan, Francoren gobernuaren, Falangearen eta beste edozein diktadura-erregimenaren aurka, bai eta demokraziaren kontrako eta monarkia berrezartzearen aldeko beste mugimendu guztien aurka ere, halakoak agertuko balira. Baionan, 1945eko martxoaren 31an"
  },
  {
    "id": "text-22",
    "number": 22,
    "title": "Antonio Añoveros Bilboko gotzainaren sermoia",
    "date": "1974-02-24",
    "theme": "Euskal gatazka",
    "body": "Euskal Herriko biztanleen bizikidetzari eta gure elizbarrutiari kalte gehien egiten dien arazoetako bat euskal gatazka delakoa da. Zertan datza arazo hori? Oinarri-oinarrizkoa bakarrik aipatuta, honela azaldu daiteke: zenbait herritarrek, bakoitzak bere ñabardurekin bada ere, euskal herria zapalduta dagoela baieztatzen dute eta haren eskubideak aitor daitezen eskatzen dute; beste herritar batzuek, ordea, errefusatu egiten dute salaketa hori, haserre, eta aldarrikatzen dute egoera aldatzeko saio guztiak gizarte-sistemaren aurkako eraso larria direla. (...) Euskal herriak berariazko ezaugarri kultural eta espiritualak ditu, eta haien artetik nabarmentzekoa da milaka urte dauzkan hizkuntza. Ezaugarri berezi horiek berariazko nortasuna ematen diote herriari, egun Espainiako estatua osatzen duten herrien artean. Espainiako estatuko gainerako herriek bezalaxe, euskal herriak ere eskubide osoa du bere nortasuna mantentzeko, bere ondare espirituala lantzeko eta garatzeko, inguruko herriekiko truke osasungarriaren aurka egin gabe, bidezko askatasuna aitortuko dion antolamendu soziopolitiko baten barruan. Baina, egungo egoeran, euskal herriak oztopo latzak ditu eskubide horretaz gozatzeko. Euskararen erabilera mugatua dago, nabarmen, maila guztietako irakaskuntzan eta komunikabideetan (prentsa, irratia, telebista). Adierazpen kulturalak ere bereizketarik gabe kontrolatzen dituzte. Elizbarrutiaren egoera honetan, Elizak, Kristoren salbamena iragartzeko eta gogora ekartzeko, aholkua eta adorea eman behar ditu, behar bezala aldatzeko (...) gure herriko egoerak (...). Antonio Añoveros, “El cristianismo, mensaje de salvación para los pueblos”, 1974ko otsailaren 24an Bizkaiko elizetan irakurritako sermoia"
  },
  {
    "id": "text-23",
    "number": 23,
    "title": "1978ko Espainiako Konstituzioa",
    "date": "1978-12-29",
    "theme": "Trantsizioa",
    "body": "Juan Carlos I.a Espainiako Erregeak honako hau ikusi eta ulertzen duzuen guztiei zera jakinarazten dizue: Gorteek honako Konstituzio hau onartu dutela eta espainiar herriak berretsi egin duela: 1. art. 1. Espainia zuzenbide-estatu sozial eta demokratiko gisa eratzen da, bere ordenamendu juridikoaren balio gorentzat hartzen dituelarik askatasuna, justizia, berdintasuna eta pluralismo politikoa. 2. Subiranotasun nazionala Espainiako herriari dagokio, eta harengandik datozkio Estatuari botereak. 3. Espainiako Estatuaren forma politikoa monarkia parlamentarioa da. 2. art. Konstituzioak Espainiako nazioaren batasun ezin hautsizkoan hartzen du oinarri, hura izanik espainiar guztien aberri erkide eta banaezina, eta era berean aitortzen eta bermatzen du Espainia osatzen duten nazionalitate eta eskualdeen autonomia-eskubidea eta haien arteko elkartasuna. 66. art. 1. Gorte Nagusiek Espainiako herria ordezkatzen dute, eta Diputatuen Kongresuak eta Senatuak osatuak dira. 98. art. 1. Gobernua honela osatua da: presidentea; presidenteordeak, hala badagokio; ministroak, eta legeak ezarritako gainerako kideak. 117. art. 1. Justizia herriarengandik dator, eta Botere Judiziala eratzen duten epaile eta magistratuek administratzen dute, Erregearen izenean. Epaile eta magistratuok independente, mugiezin eta erantzule dira, eta legearen agintera baino ez daude menderatuak. 143. art. 1. Konstituzioaren 2. artikuluan aitortutako autonomia-eskubidea erabiliz, autogobernura iritsi eta autonomia-erkidego gisa eratu ahal izango dira: historia-, kultura- eta ekonomia-ezaugarri erkideak dituzten probintzia mugakideak; uharte-lurraldeak, eta historiaz eskualde-izaera duten probintziak. Hartarako, Titulu honek eta kasuan kasuko autonomia-estatutuek diotenak agintzen du. XEDAPEN GEHIGARRIAK. Lehena. Konstituzioak babestu eta errespetatu egiten ditu foru-lurraldeen eskubide historikoak. Foru-araubide horren eguneratze orokorra, hala badagokio, Konstituzioaren eta autonomia-estatutuen esparruan egingo da. XEDAPEN INDARGABETZAILEA. 2. Oraindik ere inolako indarrik duen heinean, behin betiko indargabetutzat jotzen da 1839ko urriaren 25eko Legea, Araba, Gipuzkoa eta Bizkaiko probintziei eragin liezaiekeen guztian. Modu berean, behin betiko indargabetutzat jotzen da 1876ko uztailaren 21eko Legea. Gorteek onartutakoa 1978ko urriaren 31n. Erreferenduma abenduaren 6an. Boletín Oficial del Estado , 1978ko abenduaren 29a"
  },
  {
    "id": "text-24",
    "number": 24,
    "title": "Euskal Herriko Autonomia Estatutua",
    "date": "1979-12-18",
    "theme": "Autonomia",
    "body": "Juan Carlos I.a Espainiako Erregeak honako hau ikusi eta ulertzen duzuen guztiei zera jakinarazten dizue: Gorte Nagusiek organiko izaerarekin onartu dutela honako Lege hau eta nik berretsi egiten dudala: 1. art. Euskal Herria, bere naziotasunaren adierazpen gisa eta bere autogobernua lortzeko, Autonomia Erkidego gisa eratu da Espainiako estatuaren barruan, Euskadi edo Euskal Herria izenarekin, eta Konstituzioarekin eta bere oinarrizko erakunde araua den Estatutu honekin bat etorriz. 2. art. 1. Arabak, Gipuzkoak eta Bizkaiak, eta baita Nafarroak ere, Euskal Autonomia Erkidegoko kide izateko eskubidea dute. 2. Euskal Autonomia Erkidegoa Araba, Gipuzkoa eta Bizkaia probintzien gaur egungo mugekin bat datozen Lurralde Historikoek osatuko dute, eta baita Nafarroak ere, bertan sartzea erabakitzen badu (...). 3. art. Euskal Autonomia Erkidegoko Lurralde Historiko bakoitzak bere antolamenduari eta autogobernurako erakunde pribatiboei euts diezaieke edo, bere kasuan, berrezar eta eguneratu ditzake. 6. art. 1. Euskara Euskal Herriaren hizkuntza propioa da, eta, gaztelania bezala, hizkuntza ofiziala izango da Euskadin. Gainera, Euskadiko biztanle guztiek dute bi hizkuntzak ezagutzeko eta erabiltzeko eskubidea. 17. art. 1. (...) Euskal Autonomia Erkidegoko erakundeei dagokie (...) lurralde autonomoaren barruan pertsonak eta ondasunak babesteko eta ordena publikorako Polizia autonomoaren erregimena antolatzea. Estatuko Segurtasun Indar eta Gorputzak arduratuko dira Autonomia Erkidegoaz kanpoko eta gaindiko polizia-zerbitzuez. XEDAPEN GEHIGARRIA. Estatutu honetan xedatutako autonomia-erregimena onartzeak ez du esan nahi Euskal Herriak uko egiten dienik historiaren kariaz legozkiokeen eskubideei, zeinak antolamendu juridikoak xedatutakoaren arabera eguneratu ahal izango baitira.. Madrilgo Errege Jauregian, 1979ko abenduaren hemezortzian. JUAN CARLOS, Errege. ADOLFO SUAREZ GONZALEZ, gobernuburua"
  }
] satisfies TextSource[];

export const trapRules = [
  {
    "id": "rule-001",
    "correct": "askatasunaren",
    "wrongOptions": [
      "tiraniaren",
      "diktaduraren"
    ],
    "priority": 5,
    "reason": "Kontzeptu politiko kontrajarriak nahasten dituzte."
  },
  {
    "id": "rule-002",
    "correct": "askatasuna",
    "wrongOptions": [
      "tirania",
      "diktadura"
    ],
    "priority": 5,
    "reason": "Kontzeptu politiko kontrajarriak nahasten dituzte."
  },
  {
    "id": "rule-003",
    "correct": "Monarkiaren",
    "wrongOptions": [
      "Errepublikaren"
    ],
    "priority": 5,
    "reason": "Erregimen politikoaren aldaketa klasikoa da."
  },
  {
    "id": "rule-004",
    "correct": "monarkia",
    "wrongOptions": [
      "errepublika",
      "diktadura"
    ],
    "priority": 5,
    "reason": "Estatu-forma nahasteko aukera handia du."
  },
  {
    "id": "rule-005",
    "correct": "Errepublika",
    "wrongOptions": [
      "Monarkia",
      "Diktadura"
    ],
    "priority": 5,
    "reason": "Erregimen politikoaren aldaketa klasikoa da."
  },
  {
    "id": "rule-006",
    "correct": "Errepublikako",
    "wrongOptions": [
      "Monarkiako"
    ],
    "priority": 5,
    "reason": "Testuinguru politikoa aldatzen du."
  },
  {
    "id": "rule-007",
    "correct": "lehen",
    "wrongOptions": [
      "azken"
    ],
    "priority": 5,
    "reason": "Ordena historikoa alderantzikatzen du."
  },
  {
    "id": "rule-008",
    "correct": "azken",
    "wrongOptions": [
      "lehen"
    ],
    "priority": 4,
    "reason": "Ordena historikoa alderantzikatzen du."
  },
  {
    "id": "rule-009",
    "correct": "Espainia",
    "wrongOptions": [
      "Frantzia",
      "Italia"
    ],
    "priority": 5,
    "reason": "Herrialde historikoa ordezkatzen da."
  },
  {
    "id": "rule-010",
    "correct": "Espainiako",
    "wrongOptions": [
      "Frantziako",
      "Italiako"
    ],
    "priority": 5,
    "reason": "Herrialde historikoa ordezkatzen da."
  },
  {
    "id": "rule-011",
    "correct": "Espainiar",
    "wrongOptions": [
      "Frantziar",
      "Italiar"
    ],
    "priority": 5,
    "reason": "Herrialdeari lotutako izenondoa ordezkatzen da."
  },
  {
    "id": "rule-012",
    "correct": "espainiar",
    "wrongOptions": [
      "frantziar",
      "italiar"
    ],
    "priority": 5,
    "reason": "Herrialdeari lotutako izenondoa ordezkatzen da."
  },
  {
    "id": "rule-013",
    "correct": "Espainiaren",
    "wrongOptions": [
      "Frantziaren",
      "Italiaren"
    ],
    "priority": 4,
    "reason": "Herrialdearen genitiboa ordezkatzen da."
  },
  {
    "id": "rule-014",
    "correct": "Gipuzkoan eta Bizkaian",
    "wrongOptions": [
      "Gipuzkoan eta Araban",
      "Araban eta Bizkaian"
    ],
    "priority": 5,
    "reason": "Probintzien nahasketa oso ohikoa da."
  },
  {
    "id": "rule-015",
    "correct": "Gipuzkoa eta Bizkaia",
    "wrongOptions": [
      "Gipuzkoa eta Araba",
      "Araba eta Bizkaia"
    ],
    "priority": 5,
    "reason": "Probintzien nahasketa oso ohikoa da."
  },
  {
    "id": "rule-016",
    "correct": "Arabako",
    "wrongOptions": [
      "Bizkaiko",
      "Gipuzkoako"
    ],
    "priority": 5,
    "reason": "Foru eta kontzertu ekonomikoetan lurraldea erabakigarria da."
  },
  {
    "id": "rule-017",
    "correct": "Bizkaiko",
    "wrongOptions": [
      "Arabako",
      "Gipuzkoako"
    ],
    "priority": 5,
    "reason": "Foru eta kontzertu ekonomikoetan lurraldea erabakigarria da."
  },
  {
    "id": "rule-018",
    "correct": "Gipuzkoako",
    "wrongOptions": [
      "Arabako",
      "Bizkaiko"
    ],
    "priority": 4,
    "reason": "Lurralde historikoen kokapena nahastu ohi da."
  },
  {
    "id": "rule-019",
    "correct": "Nafarroa",
    "wrongOptions": [
      "Araba",
      "Bizkaia"
    ],
    "priority": 4,
    "reason": "Lurralde historikoen kokapena nahastu ohi da."
  },
  {
    "id": "rule-020",
    "correct": "txikiagoagatik",
    "wrongOptions": [
      "handiagoagatik"
    ],
    "priority": 5,
    "reason": "Esaldiaren zentzua guztiz aldatzen du."
  },
  {
    "id": "rule-021",
    "correct": "handiagoagatik",
    "wrongOptions": [
      "txikiagoagatik"
    ],
    "priority": 5,
    "reason": "Esaldiaren zentzua guztiz aldatzen du."
  },
  {
    "id": "rule-022",
    "correct": "uztailaren",
    "wrongOptions": [
      "maiatzaren",
      "apirilaren"
    ],
    "priority": 5,
    "reason": "Hilabetea aldatzea akats errealen eredukoa da."
  },
  {
    "id": "rule-023",
    "correct": "ekainaren",
    "wrongOptions": [
      "maiatzaren",
      "uztailaren"
    ],
    "priority": 4,
    "reason": "Hilabetea aldatzea akats errealen eredukoa da."
  },
  {
    "id": "rule-024",
    "correct": "Francisco Franco",
    "wrongOptions": [
      "Manuel Azaña",
      "Adolfo Suarez"
    ],
    "priority": 5,
    "reason": "Pertsona historikoa nahasten du; erregeak ez dira erabiltzen."
  },
  {
    "id": "rule-025",
    "correct": "Franco",
    "wrongOptions": [
      "Azaña",
      "Suarez"
    ],
    "priority": 5,
    "reason": "Pertsona historikoa nahasten du; erregeak ez dira erabiltzen."
  },
  {
    "id": "rule-026",
    "correct": "Azaña",
    "wrongOptions": [
      "Franco",
      "Canovas"
    ],
    "priority": 4,
    "reason": "Pertsona historikoa nahasteko aukera dago."
  },
  {
    "id": "rule-027",
    "correct": "katoliko",
    "wrongOptions": [
      "anglikano",
      "laiko"
    ],
    "priority": 5,
    "reason": "Erlijio ofizialaren kontzeptua aldatzen du."
  },
  {
    "id": "rule-028",
    "correct": "Katoliko",
    "wrongOptions": [
      "Anglikano",
      "Laiko"
    ],
    "priority": 5,
    "reason": "Erlijio ofizialaren kontzeptua aldatzen du."
  },
  {
    "id": "rule-029",
    "correct": "apostoliko",
    "wrongOptions": [
      "anglikano",
      "protestante"
    ],
    "priority": 4,
    "reason": "Erlijio-terminologia nahasten du."
  },
  {
    "id": "rule-030",
    "correct": "foru",
    "wrongOptions": [
      "zentralista",
      "unitario"
    ],
    "priority": 5,
    "reason": "Foru-auziaren esanahia aldatzen du."
  },
  {
    "id": "rule-031",
    "correct": "Foruak",
    "wrongOptions": [
      "Konstituzioak",
      "Dekretuak"
    ],
    "priority": 5,
    "reason": "Foru sistemaren oinarria nahasten du."
  },
  {
    "id": "rule-032",
    "correct": "autonomia",
    "wrongOptions": [
      "zentralismoa",
      "dependentzia"
    ],
    "priority": 5,
    "reason": "Autonomia eta zentralismoa kontrajarriak dira."
  },
  {
    "id": "rule-033",
    "correct": "Autonomia",
    "wrongOptions": [
      "Zentralismo",
      "Dependentzia"
    ],
    "priority": 5,
    "reason": "Autonomia eta zentralismoa kontrajarriak dira."
  },
  {
    "id": "rule-034",
    "correct": "subiranotasuna",
    "wrongOptions": [
      "menpekotasuna",
      "obedientzia"
    ],
    "priority": 5,
    "reason": "Subiranotasunaren kontzeptu politikoa aldatzen du."
  },
  {
    "id": "rule-035",
    "correct": "Nazioa",
    "wrongOptions": [
      "Monarkia",
      "Gobernua"
    ],
    "priority": 4,
    "reason": "Subjektu politikoa nahasten du."
  },
  {
    "id": "rule-036",
    "correct": "Gorteek",
    "wrongOptions": [
      "Gobernuak",
      "Armadak"
    ],
    "priority": 4,
    "reason": "Erakunde politikoak nahasten ditu."
  },
  {
    "id": "rule-037",
    "correct": "Gobernuak",
    "wrongOptions": [
      "Gorteek",
      "Elizak"
    ],
    "priority": 4,
    "reason": "Erakunde politikoak nahasten ditu."
  },
  {
    "id": "rule-038",
    "correct": "Senatua",
    "wrongOptions": [
      "Gobernua",
      "Auzitegia"
    ],
    "priority": 4,
    "reason": "Instituzioak nahasteko aukera dago."
  },
  {
    "id": "rule-039",
    "correct": "Diputatuen Kongresua",
    "wrongOptions": [
      "Senatua",
      "Ministro Kontseilua"
    ],
    "priority": 4,
    "reason": "Instituzioak nahasteko aukera dago."
  },
  {
    "id": "rule-040",
    "correct": "oligarkak",
    "wrongOptions": [
      "langileak",
      "nekazariak"
    ],
    "priority": 4,
    "reason": "Berrezarkuntzako sistema politikoaren aktoreak aldatzen ditu."
  },
  {
    "id": "rule-041",
    "correct": "jauntxoak",
    "wrongOptions": [
      "diputatuak",
      "langileak"
    ],
    "priority": 4,
    "reason": "Kazikismoaren funtsezko aktorea da."
  },
  {
    "id": "rule-042",
    "correct": "Gobernadore zibila",
    "wrongOptions": [
      "Gobernuburua",
      "Apezpikua"
    ],
    "priority": 4,
    "reason": "Kazikismoaren tresna instituzionala nahasten du."
  },
  {
    "id": "rule-043",
    "correct": "protekzionismoari",
    "wrongOptions": [
      "librekanbismoari",
      "sozialismoari"
    ],
    "priority": 5,
    "reason": "Ekonomia-politika kontrajarriak nahasten ditu."
  },
  {
    "id": "rule-044",
    "correct": "librekanbismoari",
    "wrongOptions": [
      "protekzionismoari",
      "autarkiari"
    ],
    "priority": 5,
    "reason": "Ekonomia-politika kontrajarriak nahasten ditu."
  },
  {
    "id": "rule-045",
    "correct": "aduana-zergen",
    "wrongOptions": [
      "errenta-zergen",
      "soldata-zergen"
    ],
    "priority": 4,
    "reason": "Industrializazioaren babes-neurria aldatzen du."
  },
  {
    "id": "rule-046",
    "correct": "langileen",
    "wrongOptions": [
      "jabeen",
      "militarren"
    ],
    "priority": 5,
    "reason": "Subjektu soziala aldatzen du."
  },
  {
    "id": "rule-047",
    "correct": "langile",
    "wrongOptions": [
      "jabe",
      "militar"
    ],
    "priority": 4,
    "reason": "Subjektu soziala aldatzen du."
  },
  {
    "id": "rule-048",
    "correct": "sufragio",
    "wrongOptions": [
      "errolda",
      "zentsura"
    ],
    "priority": 5,
    "reason": "Eskubide politiko nagusia nahasten du."
  },
  {
    "id": "rule-049",
    "correct": "amnistia",
    "wrongOptions": [
      "errepresioa",
      "zigorra"
    ],
    "priority": 5,
    "reason": "Fronte Popularraren neurri nagusia aldatzen du."
  },
  {
    "id": "rule-050",
    "correct": "nazionalizatu",
    "wrongOptions": [
      "pribatizatu",
      "desegin"
    ],
    "priority": 4,
    "reason": "Programa politiko-ekonomikoaren zentzua aldatzen du."
  },
  {
    "id": "rule-051",
    "correct": "sindikala",
    "wrongOptions": [
      "militarra",
      "erlijiosoa"
    ],
    "priority": 4,
    "reason": "Eskubide edo mugimendu sozialaren izaera aldatzen du."
  },
  {
    "id": "rule-052",
    "correct": "greba",
    "wrongOptions": [
      "zentsura",
      "erbeste"
    ],
    "priority": 4,
    "reason": "Langile-eskubidea nahasten du."
  },
  {
    "id": "rule-053",
    "correct": "demokratikoak",
    "wrongOptions": [
      "autoritarioak",
      "absolutistak"
    ],
    "priority": 5,
    "reason": "Erregimen politikoaren izaera aldatzen du."
  },
  {
    "id": "rule-054",
    "correct": "demokratikoa",
    "wrongOptions": [
      "autoritarioa",
      "absolutista"
    ],
    "priority": 5,
    "reason": "Erregimen politikoaren izaera aldatzen du."
  },
  {
    "id": "rule-055",
    "correct": "diktadura",
    "wrongOptions": [
      "demokrazia",
      "monarkia parlamentarioa"
    ],
    "priority": 5,
    "reason": "Erregimen politikoa nahasten du."
  },
  {
    "id": "rule-056",
    "correct": "Falangearen",
    "wrongOptions": [
      "Fronte Popularraren",
      "EAJren"
    ],
    "priority": 4,
    "reason": "Frankismoko erakunde politikoa nahasten du."
  },
  {
    "id": "rule-057",
    "correct": "Mugimendu Nazionalaren",
    "wrongOptions": [
      "Fronte Popularraren",
      "Errepublikaren"
    ],
    "priority": 5,
    "reason": "Frankismoko kontzeptu politikoa aldatzen du."
  },
  {
    "id": "rule-058",
    "correct": "Erresuma",
    "wrongOptions": [
      "Errepublika",
      "Federazioa"
    ],
    "priority": 4,
    "reason": "Estatuaren forma juridikoa nahasten du."
  },
  {
    "id": "rule-059",
    "correct": "monarkia parlamentarioa",
    "wrongOptions": [
      "errepublika federala",
      "diktadura militarra"
    ],
    "priority": 5,
    "reason": "1978ko Konstituzioaren oinarrizko forma politikoa da."
  },
  {
    "id": "rule-060",
    "correct": "pluralismo politikoa",
    "wrongOptions": [
      "alderdi bakarra",
      "zentralismo politikoa"
    ],
    "priority": 5,
    "reason": "1978ko balio konstituzionala aldatzen du."
  },
  {
    "id": "rule-061",
    "correct": "eskubide historikoak",
    "wrongOptions": [
      "pribilegio ekonomikoak",
      "eskubide kolonialak"
    ],
    "priority": 5,
    "reason": "Foru-lurraldeen aitortza nahasten du."
  },
  {
    "id": "rule-062",
    "correct": "Euskara",
    "wrongOptions": [
      "Gaztelania",
      "Frantsesa"
    ],
    "priority": 5,
    "reason": "Hizkuntza propioaren aipamena aldatzen du."
  },
  {
    "id": "rule-063",
    "correct": "hizkuntza ofiziala",
    "wrongOptions": [
      "hizkuntza debekatua",
      "hizkuntza bakarra"
    ],
    "priority": 4,
    "reason": "Estatutuetako hizkuntza-araubidea nahasten du."
  },
  {
    "id": "rule-064",
    "correct": "Polizia autonomoaren",
    "wrongOptions": [
      "Ejertzito nazionalaren",
      "Guardia Zibilaren"
    ],
    "priority": 5,
    "reason": "Autogobernuko eskumena nahasten du."
  },
  {
    "id": "rule-065",
    "correct": "emakumearen",
    "wrongOptions": [
      "gizonaren",
      "haurraren"
    ],
    "priority": 5,
    "reason": "Sufragioari eta eskubide politikoei lotutako subjektua aldatzen du."
  },
  {
    "id": "rule-066",
    "correct": "emakumeari",
    "wrongOptions": [
      "gizonari",
      "herritarrari"
    ],
    "priority": 5,
    "reason": "Campoamorren testuko subjektu politikoa aldatzen du."
  },
  {
    "id": "rule-067",
    "correct": "Zuzenbidean",
    "wrongOptions": [
      "Medikuntzan",
      "Elizan"
    ],
    "priority": 4,
    "reason": "Emakumearen gaitasun juridiko-politikoa nahasten du."
  },
  {
    "id": "rule-068",
    "correct": "latindar",
    "wrongOptions": [
      "germaniar",
      "anglosaxoi"
    ],
    "priority": 4,
    "reason": "Campoamorren argudio geopolitikoa aldatzen du."
  },
  {
    "id": "rule-069",
    "correct": "ganbera",
    "wrongOptions": [
      "elizbarruti",
      "udal"
    ],
    "priority": 4,
    "reason": "Instituzio politikoa beste eremu batekin nahasten du."
  },
  {
    "id": "rule-070",
    "correct": "1933ko azaroaz",
    "wrongOptions": [
      "1934ko urriaz",
      "1936ko uztailaz"
    ],
    "priority": 5,
    "reason": "Fronte Popularraren amnistiaren erreferentzia kronologikoa nahasten du."
  },
  {
    "id": "rule-071",
    "correct": "delitu politiko eta sozialen",
    "wrongOptions": [
      "delitu militarren",
      "delitu ekonomikoen"
    ],
    "priority": 5,
    "reason": "Amnistiaren izaera aldatzen du."
  },
  {
    "id": "rule-072",
    "correct": "Estatu errepublikanoaren",
    "wrongOptions": [
      "Estatu monarkikoaren",
      "Estatu frankistaren"
    ],
    "priority": 5,
    "reason": "Fronte Popularraren testuinguru politikoa aldatzen du."
  },
  {
    "id": "rule-073",
    "correct": "lurra nazionalizatu",
    "wrongOptions": [
      "lurra pribatizatu",
      "bankuak nazionalizatu"
    ],
    "priority": 5,
    "reason": "Programa politikoaren neurri ekonomikoa aldatzen du."
  },
  {
    "id": "rule-074",
    "correct": "bankuak nazionalizatzeko",
    "wrongOptions": [
      "lurra nazionalizatzeko",
      "trenbideak pribatizatzeko"
    ],
    "priority": 5,
    "reason": "Programa ekonomikoaren proposamena nahasten du."
  },
  {
    "id": "rule-075",
    "correct": "langile-kontrola",
    "wrongOptions": [
      "kontrol militarra",
      "eliz kontrola"
    ],
    "priority": 5,
    "reason": "Langileen parte-hartze ekonomikoa nahasten du."
  },
  {
    "id": "rule-076",
    "correct": "Arabak, Gipuzkoak eta Bizkaiak",
    "wrongOptions": [
      "Nafarroak, Gipuzkoak eta Bizkaiak",
      "Arabak, Nafarroak eta Bizkaiak"
    ],
    "priority": 5,
    "reason": "1936ko Estatutuaren lurralde-osaketa nahasten du."
  },
  {
    "id": "rule-077",
    "correct": "Euskara, gaztelania bezala",
    "wrongOptions": [
      "Euskara, frantsesa bezala",
      "Gaztelania, euskara gabe"
    ],
    "priority": 5,
    "reason": "Hizkuntza ofizialen araubidea nahasten du."
  },
  {
    "id": "rule-078",
    "correct": "sufragio unibertsal, berdin, zuzen eta sekretu",
    "wrongOptions": [
      "sufragio zentsitario, zeharkako eta sekretu",
      "sufragio mugatu, publiko eta zeharkako"
    ],
    "priority": 5,
    "reason": "Ordezkaritza demokratikoaren formula aldatzen du."
  },
  {
    "id": "rule-079",
    "correct": "Bizkaiko gobernadore zibilak",
    "wrongOptions": [
      "Arabako gobernadore zibilak",
      "Nafarroako gobernadore militarrak"
    ],
    "priority": 5,
    "reason": "1936ko behin-behineko gobernuaren prozedura nahasten du."
  },
  {
    "id": "rule-080",
    "correct": "1934ko urriaren 1etik",
    "wrongOptions": [
      "1936ko uztailaren 18tik",
      "1931ko apirilaren 14tik"
    ],
    "priority": 5,
    "reason": "Erantzukizun Politikoaren Legearen hasiera kronologikoa aldatzen du."
  },
  {
    "id": "rule-081",
    "correct": "1936ko uztailaren 18ra",
    "wrongOptions": [
      "1934ko urriaren 1era",
      "1939ko apirilaren 1era"
    ],
    "priority": 5,
    "reason": "Erantzukizun Politikoaren Legearen epe historikoa aldatzen du."
  },
  {
    "id": "rule-082",
    "correct": "Falange Española Tradicionalista y de las JONSen",
    "wrongOptions": [
      "Fronte Popularraren",
      "EAJ-PNVren"
    ],
    "priority": 5,
    "reason": "Frankismoaren erakunde politikoa nahasten du."
  },
  {
    "id": "rule-083",
    "correct": "Fronte Popularra",
    "wrongOptions": [
      "Mugimendu Nazionala",
      "FET y de las JONS"
    ],
    "priority": 5,
    "reason": "1936ko bloke politikoak kontrajartzen ditu."
  },
  {
    "id": "rule-084",
    "correct": "erakunde separatistak",
    "wrongOptions": [
      "erakunde monarkikoak",
      "erakunde katolikoak"
    ],
    "priority": 4,
    "reason": "Frankismoaren errepresioaren helburua aldatzen du."
  },
  {
    "id": "rule-085",
    "correct": "nazio-intereseko",
    "wrongOptions": [
      "interes pribatudun",
      "interes kolonialeko"
    ],
    "priority": 5,
    "reason": "Autarkiaren industria-politikako kategoria aldatzen du."
  },
  {
    "id": "rule-086",
    "correct": "babesteko",
    "wrongOptions": [
      "pribatizatzeko",
      "zigortzeko"
    ],
    "priority": 5,
    "reason": "Autarkiaren industria-politikaren helburua kontrako zentzuarekin ordezkatzen du."
  },
  {
    "id": "rule-087",
    "correct": "inportaziotik",
    "wrongOptions": [
      "esportaziotik",
      "autarkiatik"
    ],
    "priority": 5,
    "reason": "Autarkiaren helburu ekonomikoa nahasten du."
  },
  {
    "id": "rule-088",
    "correct": "ekimen partikularra",
    "wrongOptions": [
      "ekimen sindikala",
      "ekimen militarra"
    ],
    "priority": 4,
    "reason": "Industria-politikaren eragile ekonomikoa nahasten du."
  },
  {
    "id": "rule-089",
    "correct": "Estatuak",
    "wrongOptions": [
      "Elizak",
      "Sindikatuek"
    ],
    "priority": 4,
    "reason": "Autarkian esku-hartzen duen erakundea aldatzen du."
  },
  {
    "id": "rule-090",
    "correct": "Gizakiaren Eskubideei",
    "wrongOptions": [
      "Estatuaren Printzipioei",
      "Falangearen Arauei"
    ],
    "priority": 5,
    "reason": "Municheko testuaren erreferentzia demokratikoa aldatzen du."
  },
  {
    "id": "rule-091",
    "correct": "adierazpen-askatasunari",
    "wrongOptions": [
      "zentsurari",
      "obedientzia politikoari"
    ],
    "priority": 5,
    "reason": "Eskubide demokratikoa kontrako kontzeptuarekin ordezkatzen du."
  },
  {
    "id": "rule-092",
    "correct": "alderdi politikoak",
    "wrongOptions": [
      "alderdi bakarra",
      "sindikatu bertikalak"
    ],
    "priority": 5,
    "reason": "Pluralismo politikoa eta alderdi bakarra kontrajartzen ditu."
  },
  {
    "id": "rule-093",
    "correct": "bortxakeria aktibo nahiz pasiboari",
    "wrongOptions": [
      "hauteskunde askeei",
      "autonomia eskubideari"
    ],
    "priority": 4,
    "reason": "Municheko konpromiso politikoa aldatzen du."
  },
  {
    "id": "rule-094",
    "correct": "Espainiar estatua",
    "wrongOptions": [
      "Italiar estatua",
      "Frantziar estatua"
    ],
    "priority": 5,
    "reason": "Estatu frankistaren subjektu politikoa aldatzen du."
  },
  {
    "id": "rule-095",
    "correct": "botere-batasunaren",
    "wrongOptions": [
      "botere-banaketaren",
      "subiranotasun herrikoiaren"
    ],
    "priority": 5,
    "reason": "Frankismoaren egitura politikoa kontrako printzipioarekin ordezkatzen du."
  },
  {
    "id": "rule-096",
    "correct": "Estatuburua",
    "wrongOptions": [
      "Gobernuburua",
      "Gorteetako presidentea"
    ],
    "priority": 5,
    "reason": "Frankismoaren botere gorenaren figura nahasten du."
  },
  {
    "id": "rule-097",
    "correct": "Gobernuburuak",
    "wrongOptions": [
      "Estatuburuak",
      "Diputatuek"
    ],
    "priority": 4,
    "reason": "Estatuaren Lege Organikoko kargu politikoa nahasten du."
  },
  {
    "id": "rule-098",
    "correct": "Euzkadiko Gobernua",
    "wrongOptions": [
      "Espainiako Gobernua",
      "Falangearen Gobernua"
    ],
    "priority": 5,
    "reason": "Erbesteko euskal erakunde politikoa nahasten du."
  },
  {
    "id": "rule-099",
    "correct": "Jose Antonio Agirre",
    "wrongOptions": [
      "Francisco Franco",
      "Manuel Azaña"
    ],
    "priority": 5,
    "reason": "Euskal gobernuaren lehendakaria beste figura batekin ordezkatzen du."
  },
  {
    "id": "rule-100",
    "correct": "Francoren gobernuaren",
    "wrongOptions": [
      "Errepublikaren gobernuaren",
      "Agirreren gobernuaren"
    ],
    "priority": 5,
    "reason": "Baionako Hitzarmeneko aurkari politikoa aldatzen du."
  },
  {
    "id": "rule-101",
    "correct": "monarkia berrezartzearen",
    "wrongOptions": [
      "errepublika berrezartzearen",
      "autonomia berrezartzearen"
    ],
    "priority": 4,
    "reason": "Baionako Hitzarmeneko arrisku politikoa nahasten du."
  },
  {
    "id": "rule-102",
    "correct": "euskal gatazka",
    "wrongOptions": [
      "auzi soziala",
      "krisi ekonomikoa"
    ],
    "priority": 5,
    "reason": "Añoverosen sermoiaren arazo nagusia aldatzen du."
  },
  {
    "id": "rule-103",
    "correct": "zapalduta",
    "wrongOptions": [
      "askatuta",
      "integratuta"
    ],
    "priority": 5,
    "reason": "Sermoiaren salaketa politikoaren zentzua aldatzen du."
  },
  {
    "id": "rule-104",
    "correct": "Euskararen erabilera",
    "wrongOptions": [
      "Gaztelaniaren erabilera",
      "Frantsesaren erabilera"
    ],
    "priority": 5,
    "reason": "Sermoiaren hizkuntza-arazo nagusia nahasten du."
  },
  {
    "id": "rule-105",
    "correct": "irakaskuntzan eta komunikabideetan",
    "wrongOptions": [
      "armadan eta epaitegietan",
      "bankuetan eta lantegietan"
    ],
    "priority": 4,
    "reason": "Euskararen murrizketaren eremuak aldatzen ditu."
  },
  {
    "id": "rule-106",
    "correct": "Elizak",
    "wrongOptions": [
      "Estatuak",
      "Armadak"
    ],
    "priority": 4,
    "reason": "Sermoiaren subjektu instituzionala nahasten du."
  },
  {
    "id": "rule-107",
    "correct": "zuzenbide-estatu sozial eta demokratiko",
    "wrongOptions": [
      "estatu autoritario eta zentralista",
      "monarkia absolutu eta konfesional"
    ],
    "priority": 5,
    "reason": "1978ko Konstituzioaren definizio nagusia aldatzen du."
  },
  {
    "id": "rule-108",
    "correct": "Espainiako herriari",
    "wrongOptions": [
      "Erregeari",
      "Armadari"
    ],
    "priority": 5,
    "reason": "Subiranotasun nazionalaren titularra nahasten du."
  },
  {
    "id": "rule-109",
    "correct": "nazionalitate eta eskualdeen",
    "wrongOptions": [
      "probintzia eta kolonien",
      "udalerri eta elizbarrutien"
    ],
    "priority": 5,
    "reason": "Autonomia-eskubidearen subjektuak nahasten ditu."
  },
  {
    "id": "rule-110",
    "correct": "foru-lurraldeen",
    "wrongOptions": [
      "kolonia-lurraldeen",
      "udal-lurraldeen"
    ],
    "priority": 5,
    "reason": "Eskubide historikoen titularra aldatzen du."
  },
  {
    "id": "rule-111",
    "correct": "Euskadi edo Euskal Herria",
    "wrongOptions": [
      "Nafarroa edo Espainia",
      "Bizkaia edo Gipuzkoa"
    ],
    "priority": 5,
    "reason": "1979ko Estatutuaren izendapena nahasten du."
  },
  {
    "id": "rule-112",
    "correct": "Nafarroak ere",
    "wrongOptions": [
      "Errioxak ere",
      "Kantabriak ere"
    ],
    "priority": 5,
    "reason": "Gernikako Estatutuaren lurralde-aukerari eragiten dio."
  },
  {
    "id": "rule-113",
    "correct": "Lurralde Historikoek",
    "wrongOptions": [
      "Probintzia arruntek",
      "Udalerriek"
    ],
    "priority": 5,
    "reason": "EAEren egitura instituzionala nahasten du."
  },
  {
    "id": "rule-114",
    "correct": "Estatuko Segurtasun Indar eta Gorputzak",
    "wrongOptions": [
      "Polizia autonomoak",
      "Euzko Gudarosteak"
    ],
    "priority": 5,
    "reason": "Polizia-eskumenen banaketa nahasten du."
  },
  {
    "id": "rule-115",
    "correct": "monarkiaren",
    "wrongOptions": [
      "Errepublikaren",
      "diktaduraren"
    ],
    "priority": 5,
    "reason": "Clara Campoamorren testuan erregimen politikoen kontrastea da gakoa."
  },
  {
    "id": "rule-116",
    "correct": "Errepublikaren",
    "wrongOptions": [
      "Monarkiaren",
      "Diktaduraren"
    ],
    "priority": 5,
    "reason": "Iturriaren eta testuinguru politikoaren erregimena aldatzen du."
  },
  {
    "id": "rule-117",
    "correct": "monarkiaren menpe",
    "wrongOptions": [
      "Errepublikaren menpe",
      "diktaduraren menpe"
    ],
    "priority": 5,
    "reason": "2025eko ereduko akatsaren antzekoa da: aurreko erregimenaren erreferentzia aldatzen du."
  },
  {
    "id": "rule-118",
    "correct": "Gorte Konstituziogileen",
    "wrongOptions": [
      "Gorte Arrunten",
      "Gorte Frankisten"
    ],
    "priority": 4,
    "reason": "Iturri instituzionalaren izaera aldatzen du."
  }
] satisfies TrapRule[];

export const events = [
  {
    "id": "event-001",
    "date": "1807",
    "sortKey": "1807-00-00",
    "label": "Fontainebleauko Ituna",
    "theme": "Estatu liberala",
    "priority": 4
  },
  {
    "id": "event-002",
    "date": "1808-05-02",
    "sortKey": "1808-05-02",
    "label": "Independentzia Gerraren hasiera",
    "theme": "Estatu liberala",
    "priority": 5
  },
  {
    "id": "event-003",
    "date": "1808",
    "sortKey": "1808-00-00",
    "label": "Aranjuezeko altxamendua",
    "theme": "Estatu liberala",
    "priority": 4
  },
  {
    "id": "event-004",
    "date": "1808",
    "sortKey": "1808-00-00",
    "label": "Baionako abdikazioak",
    "theme": "Estatu liberala",
    "priority": 4
  },
  {
    "id": "event-005",
    "date": "1808",
    "sortKey": "1808-00-00",
    "label": "Baionako Estatutua",
    "theme": "Estatu liberala",
    "priority": 4
  },
  {
    "id": "event-006",
    "date": "1810",
    "sortKey": "1810-00-00",
    "label": "Junta Zentrala sortzea",
    "theme": "Estatu liberala",
    "priority": 3
  },
  {
    "id": "event-007",
    "date": "1810-1812",
    "sortKey": "1810-00-00",
    "label": "Cadizeko Gorteak eta Konstituzioaren lanketa",
    "theme": "Estatu liberala",
    "priority": 4
  },
  {
    "id": "event-008",
    "date": "1812-03-19",
    "sortKey": "1812-03-19",
    "label": "Cadizko Konstituzioa aldarrikatzea",
    "theme": "Estatu liberala",
    "priority": 5
  },
  {
    "id": "event-009",
    "date": "1814",
    "sortKey": "1814-00-00",
    "label": "Fernando VII.aren itzulera Espainiara",
    "theme": "Absolutismoa",
    "priority": 4
  },
  {
    "id": "event-010",
    "date": "1814-04-12",
    "sortKey": "1814-04-12",
    "label": "Persiarren Manifestua",
    "theme": "Absolutismoa",
    "priority": 4
  },
  {
    "id": "event-011",
    "date": "1830",
    "sortKey": "1830-00-00",
    "label": "Santzio Pragmatikoa ezartzea",
    "theme": "Estatu liberala",
    "priority": 4
  },
  {
    "id": "event-012",
    "date": "1833",
    "sortKey": "1833-00-00",
    "label": "Lehen Karlistaldiaren hasiera",
    "theme": "Foruak",
    "priority": 5
  },
  {
    "id": "event-013",
    "date": "1837",
    "sortKey": "1837-00-00",
    "label": "1837ko Konstituzioa",
    "theme": "Estatu liberala",
    "priority": 4
  },
  {
    "id": "event-014",
    "date": "1839-08-31",
    "sortKey": "1839-08-31",
    "label": "Bergarako Besarkada",
    "theme": "Foruak",
    "priority": 5
  },
  {
    "id": "event-015",
    "date": "1839-10-25",
    "sortKey": "1839-10-25",
    "label": "Foruak berresten dituen legea",
    "theme": "Foruak",
    "priority": 5
  },
  {
    "id": "event-016",
    "date": "1841",
    "sortKey": "1841-00-00",
    "label": "Nafarroako Lege Hitzartua",
    "theme": "Foruak",
    "priority": 4
  },
  {
    "id": "event-017",
    "date": "1841-10-29",
    "sortKey": "1841-10-29",
    "label": "Foruak eraldatzeko dekretua",
    "theme": "Foruak",
    "priority": 4
  },
  {
    "id": "event-018",
    "date": "1844",
    "sortKey": "1844-00-00",
    "label": "Isabel II.aren erreginaldiaren hasiera",
    "theme": "Estatu liberala",
    "priority": 3
  },
  {
    "id": "event-019",
    "date": "1856",
    "sortKey": "1856-00-00",
    "label": "Bessemer bihurgailuaren hedapena",
    "theme": "Industrializazioa",
    "priority": 3
  },
  {
    "id": "event-020",
    "date": "1855-06-03",
    "sortKey": "1855-06-03",
    "label": "Burdinbideen Lege Orokorra",
    "theme": "Ekonomia",
    "priority": 4
  },
  {
    "id": "event-021",
    "date": "1860",
    "sortKey": "1860-00-00",
    "label": "Burdinbide sarearen hedapena Euskal Herrian",
    "theme": "Industrializazioa",
    "priority": 3
  },
  {
    "id": "event-022",
    "date": "1860",
    "sortKey": "1860-00-00",
    "label": "Banco de Bilbaoren sorrera inguruko finantza garapena",
    "theme": "Industrializazioa",
    "priority": 3
  },
  {
    "id": "event-023",
    "date": "1868",
    "sortKey": "1868-00-00",
    "label": "Iraultza Loriatsua",
    "theme": "Seiurtekoa",
    "priority": 5
  },
  {
    "id": "event-024",
    "date": "1871",
    "sortKey": "1871-00-00",
    "label": "Amadeo Saboikakoaren erregealdiaren hasiera",
    "theme": "Seiurtekoa",
    "priority": 4
  },
  {
    "id": "event-025",
    "date": "1873",
    "sortKey": "1873-00-00",
    "label": "Lehen Errepublika aldarrikatzea",
    "theme": "Seiurtekoa",
    "priority": 5
  },
  {
    "id": "event-026",
    "date": "1873",
    "sortKey": "1873-00-00",
    "label": "Hirugarren Gerra Karlistaren indartzea",
    "theme": "Foruak",
    "priority": 4
  },
  {
    "id": "event-027",
    "date": "1874",
    "sortKey": "1874-00-00",
    "label": "Berrezarkuntzaren hasiera",
    "theme": "Berrezarkuntza",
    "priority": 5
  },
  {
    "id": "event-028",
    "date": "1875",
    "sortKey": "1875-00-00",
    "label": "Berrezarkuntza garaia hasten da",
    "theme": "Berrezarkuntza",
    "priority": 4
  },
  {
    "id": "event-029",
    "date": "1876-06-30",
    "sortKey": "1876-06-30",
    "label": "1876ko Konstituzioa",
    "theme": "Berrezarkuntza",
    "priority": 5
  },
  {
    "id": "event-030",
    "date": "1876-07-21",
    "sortKey": "1876-07-21",
    "label": "Foru-indargabetzearen legea",
    "theme": "Foruak",
    "priority": 5
  },
  {
    "id": "event-031",
    "date": "1878",
    "sortKey": "1878-00-00",
    "label": "Lehen Kontzertu Ekonomikoa",
    "theme": "Foruak",
    "priority": 5
  },
  {
    "id": "event-032",
    "date": "1879",
    "sortKey": "1879-00-00",
    "label": "PSOEren sorrera",
    "theme": "Langile-mugimendua",
    "priority": 4
  },
  {
    "id": "event-033",
    "date": "1887",
    "sortKey": "1887-00-00",
    "label": "Elkarteen Legea",
    "theme": "Langile-mugimendua",
    "priority": 4
  },
  {
    "id": "event-034",
    "date": "1890",
    "sortKey": "1890-00-00",
    "label": "Lehen greba modernoen hasiera",
    "theme": "Langile-mugimendua",
    "priority": 4
  },
  {
    "id": "event-035",
    "date": "1890",
    "sortKey": "1890-00-00",
    "label": "Babes-politika protekzionistaren indartzea",
    "theme": "Industrializazioa",
    "priority": 4
  },
  {
    "id": "event-036",
    "date": "1893-12-09",
    "sortKey": "1893-12-09",
    "label": "Federico Etxeberriaren hitzaldia",
    "theme": "Industrializazioa",
    "priority": 4
  },
  {
    "id": "event-037",
    "date": "1894",
    "sortKey": "1894-00-00",
    "label": "Euskeldun Batzokijaren estatutuak",
    "theme": "Nazionalismoa",
    "priority": 5
  },
  {
    "id": "event-038",
    "date": "1895",
    "sortKey": "1895-00-00",
    "label": "EAJ-PNVren sorrera",
    "theme": "Nazionalismoa",
    "priority": 5
  },
  {
    "id": "event-039",
    "date": "1896-05-23",
    "sortKey": "1896-05-23",
    "label": "La Lucha de Clases artikulua",
    "theme": "Langile-mugimendua",
    "priority": 4
  },
  {
    "id": "event-040",
    "date": "1898",
    "sortKey": "1898-00-00",
    "label": "Kubako gerra eta 98ko krisia",
    "theme": "Berrezarkuntza",
    "priority": 5
  },
  {
    "id": "event-041",
    "date": "1901",
    "sortKey": "1901-00-00",
    "label": "Oligarquía y caciquismo argitaratzea",
    "theme": "Berrezarkuntza",
    "priority": 4
  },
  {
    "id": "event-042",
    "date": "1909",
    "sortKey": "1909-00-00",
    "label": "Bartzelonako Aste Tragikoa",
    "theme": "Berrezarkuntza",
    "priority": 4
  },
  {
    "id": "event-043",
    "date": "1917",
    "sortKey": "1917-00-00",
    "label": "1917ko krisia",
    "theme": "Berrezarkuntza",
    "priority": 5
  },
  {
    "id": "event-044",
    "date": "1923-09-13",
    "sortKey": "1923-09-13",
    "label": "Primo de Riveraren estatu-kolpea",
    "theme": "Diktadura",
    "priority": 5
  },
  {
    "id": "event-045",
    "date": "1929",
    "sortKey": "1929-00-00",
    "label": "Depresio Handia edo 29ko krisia",
    "theme": "Berrezarkuntza",
    "priority": 3
  },
  {
    "id": "event-046",
    "date": "1930",
    "sortKey": "1930-00-00",
    "label": "Primo de Riveraren diktaduraren amaiera",
    "theme": "Diktadura",
    "priority": 4
  },
  {
    "id": "event-047",
    "date": "1930",
    "sortKey": "1930-00-00",
    "label": "Donostiako Ituna",
    "theme": "II. Errepublika",
    "priority": 5
  },
  {
    "id": "event-048",
    "date": "1931-04-14",
    "sortKey": "1931-04-14",
    "label": "II. Errepublika aldarrikatzea",
    "theme": "II. Errepublika",
    "priority": 5
  },
  {
    "id": "event-049",
    "date": "1931",
    "sortKey": "1931-00-00",
    "label": "1931ko Konstituzioa",
    "theme": "II. Errepublika",
    "priority": 5
  },
  {
    "id": "event-050",
    "date": "1931-09-01",
    "sortKey": "1931-09-01",
    "label": "Clara Campoamorren hitzaldia",
    "theme": "II. Errepublika",
    "priority": 4
  },
  {
    "id": "event-051",
    "date": "1931-1933",
    "sortKey": "1931-00-00",
    "label": "Biurteko erreformista",
    "theme": "II. Errepublika",
    "priority": 5
  },
  {
    "id": "event-052",
    "date": "1932",
    "sortKey": "1932-00-00",
    "label": "Sanjurjada",
    "theme": "II. Errepublika",
    "priority": 4
  },
  {
    "id": "event-053",
    "date": "1933-1936",
    "sortKey": "1933-00-00",
    "label": "Zentro-eskuineko biurtekoa",
    "theme": "II. Errepublika",
    "priority": 4
  },
  {
    "id": "event-054",
    "date": "1933-11-05",
    "sortKey": "1933-11-05",
    "label": "Euskal Autonomia Estatutuaren herri-erreferenduma",
    "theme": "Autonomia",
    "priority": 5
  },
  {
    "id": "event-055",
    "date": "1933-11",
    "sortKey": "1933-11-00",
    "label": "Emakumeek lehen aldiz bozkatu hauteskunde orokorretan",
    "theme": "II. Errepublika",
    "priority": 4
  },
  {
    "id": "event-056",
    "date": "1934-10",
    "sortKey": "1934-10-00",
    "label": "Urriko Iraultza",
    "theme": "II. Errepublika",
    "priority": 4
  },
  {
    "id": "event-057",
    "date": "1936-01-16",
    "sortKey": "1936-01-16",
    "label": "Fronte Popularraren programa",
    "theme": "II. Errepublika",
    "priority": 5
  },
  {
    "id": "event-058",
    "date": "1936-07-17",
    "sortKey": "1936-07-17",
    "label": "Altxamendu militarraren hasiera",
    "theme": "Gerra Zibila",
    "priority": 5
  },
  {
    "id": "event-059",
    "date": "1936-10-01",
    "sortKey": "1936-10-01",
    "label": "Franco estatuburu izendatzea",
    "theme": "Gerra Zibila",
    "priority": 4
  },
  {
    "id": "event-060",
    "date": "1936-09",
    "sortKey": "1936-09-00",
    "label": "Nazionalek Gipuzkoa hartzea",
    "theme": "Gerra Zibila",
    "priority": 4
  },
  {
    "id": "event-061",
    "date": "1936-10-04",
    "sortKey": "1936-10-04",
    "label": "1936ko Euskal Autonomia Estatutua",
    "theme": "Autonomia",
    "priority": 5
  },
  {
    "id": "event-062",
    "date": "1936-10-07",
    "sortKey": "1936-10-07",
    "label": "Lehen Eusko Jaurlaritza eratzea",
    "theme": "Gerra Zibila",
    "priority": 5
  },
  {
    "id": "event-063",
    "date": "1936-10-07",
    "sortKey": "1936-10-07",
    "label": "Euzko Gudarostea sortzea",
    "theme": "Gerra Zibila",
    "priority": 4
  },
  {
    "id": "event-064",
    "date": "1937",
    "sortKey": "1937-00-00",
    "label": "Iparraldeko frontea nazionalen esku",
    "theme": "Gerra Zibila",
    "priority": 4
  },
  {
    "id": "event-065",
    "date": "1937-04-26",
    "sortKey": "1937-04-26",
    "label": "Gernikako bonbardaketa",
    "theme": "Gerra Zibila",
    "priority": 5
  },
  {
    "id": "event-066",
    "date": "1937-06-19",
    "sortKey": "1937-06-19",
    "label": "Bilbo erortzea",
    "theme": "Gerra Zibila",
    "priority": 5
  },
  {
    "id": "event-067",
    "date": "1937-06-23",
    "sortKey": "1937-06-23",
    "label": "Bizkaia eta Gipuzkoako kontzertu ekonomikoak ezeztatzea",
    "theme": "Gerra Zibila",
    "priority": 5
  },
  {
    "id": "event-068",
    "date": "1937-08",
    "sortKey": "1937-08-00",
    "label": "Santoñako Ituna",
    "theme": "Gerra Zibila",
    "priority": 4
  },
  {
    "id": "event-069",
    "date": "1938",
    "sortKey": "1938-00-00",
    "label": "Aragoi, Katalunia, Valentzia eta Madrilen aurkako azken ofentsibak",
    "theme": "Gerra Zibila",
    "priority": 3
  },
  {
    "id": "event-070",
    "date": "1939-02-13",
    "sortKey": "1939-02-13",
    "label": "Erantzukizun Politikoaren Legea",
    "theme": "Frankismoa",
    "priority": 5
  },
  {
    "id": "event-071",
    "date": "1939-04-01",
    "sortKey": "1939-04-01",
    "label": "Gerra Zibilaren amaiera",
    "theme": "Frankismoa",
    "priority": 5
  },
  {
    "id": "event-072",
    "date": "1939-10-25",
    "sortKey": "1939-10-25",
    "label": "Nazio-intereseko industriak babesteko legea",
    "theme": "Autarkia",
    "priority": 4
  },
  {
    "id": "event-073",
    "date": "1941",
    "sortKey": "1941-00-00",
    "label": "Dibisio Urdina Sobietar Batasunera bidaltzea",
    "theme": "Frankismoa",
    "priority": 3
  },
  {
    "id": "event-074",
    "date": "1943",
    "sortKey": "1943-00-00",
    "label": "Espainiaren neutraltasun-ituna Bigarren Mundu Gerran",
    "theme": "Frankismoa",
    "priority": 3
  },
  {
    "id": "event-075",
    "date": "1945-03-31",
    "sortKey": "1945-03-31",
    "label": "Baionako Hitzarmena",
    "theme": "Erbestea",
    "priority": 4
  },
  {
    "id": "event-076",
    "date": "1953",
    "sortKey": "1953-00-00",
    "label": "Espainia-AEB itunak",
    "theme": "Frankismoa",
    "priority": 4
  },
  {
    "id": "event-077",
    "date": "1953",
    "sortKey": "1953-00-00",
    "label": "Egoitza Santuarekin Konkordatua",
    "theme": "Frankismoa",
    "priority": 4
  },
  {
    "id": "event-078",
    "date": "1955",
    "sortKey": "1955-00-00",
    "label": "Espainia NBEn sartzea",
    "theme": "Frankismoa",
    "priority": 4
  },
  {
    "id": "event-079",
    "date": "1956",
    "sortKey": "1956-00-00",
    "label": "Marokoren independentzia Espainiarekiko",
    "theme": "Frankismoa",
    "priority": 3
  },
  {
    "id": "event-080",
    "date": "1959",
    "sortKey": "1959-00-00",
    "label": "Egonkortze Plana",
    "theme": "Desarrollismoa",
    "priority": 5
  },
  {
    "id": "event-081",
    "date": "1963",
    "sortKey": "1963-00-00",
    "label": "Garapen Plana",
    "theme": "Desarrollismoa",
    "priority": 4
  },
  {
    "id": "event-082",
    "date": "1962-06-08",
    "sortKey": "1962-06-08",
    "label": "Municheko Kongresuaren erabakia",
    "theme": "Oposizioa",
    "priority": 5
  },
  {
    "id": "event-083",
    "date": "1966",
    "sortKey": "1966-00-00",
    "label": "Prentsaren Legea",
    "theme": "Frankismoa",
    "priority": 4
  },
  {
    "id": "event-084",
    "date": "1967-01-11",
    "sortKey": "1967-01-11",
    "label": "Estatuaren Lege Organikoa",
    "theme": "Frankismoa",
    "priority": 5
  },
  {
    "id": "event-085",
    "date": "1968",
    "sortKey": "1968-00-00",
    "label": "ETAren lehen hilketa",
    "theme": "Euskal gatazka",
    "priority": 4
  },
  {
    "id": "event-086",
    "date": "1968",
    "sortKey": "1968-00-00",
    "label": "Guinea Ekuatorialaren independentzia",
    "theme": "Frankismoa",
    "priority": 3
  },
  {
    "id": "event-087",
    "date": "1969",
    "sortKey": "1969-00-00",
    "label": "Juan Carlos ondorengo izendatzea",
    "theme": "Frankismoa",
    "priority": 4
  },
  {
    "id": "event-088",
    "date": "1970",
    "sortKey": "1970-00-00",
    "label": "Burgoseko Prozesua",
    "theme": "Euskal gatazka",
    "priority": 5
  },
  {
    "id": "event-089",
    "date": "1973",
    "sortKey": "1973-00-00",
    "label": "Petrolioaren krisia",
    "theme": "Desarrollismoa",
    "priority": 4
  },
  {
    "id": "event-090",
    "date": "1973",
    "sortKey": "1973-00-00",
    "label": "Carrero Blanco gobernuburu izendatzea",
    "theme": "Frankismoa",
    "priority": 4
  },
  {
    "id": "event-091",
    "date": "1973-12-20",
    "sortKey": "1973-12-20",
    "label": "Carrero Blancoren aurkako atentatua",
    "theme": "Frankismoa",
    "priority": 5
  },
  {
    "id": "event-092",
    "date": "1974-02-24",
    "sortKey": "1974-02-24",
    "label": "Añoverosen sermoia",
    "theme": "Euskal gatazka",
    "priority": 4
  },
  {
    "id": "event-093",
    "date": "1975-11-20",
    "sortKey": "1975-11-20",
    "label": "Francoren heriotza",
    "theme": "Trantsizioa",
    "priority": 5
  },
  {
    "id": "event-094",
    "date": "1975",
    "sortKey": "1975-00-00",
    "label": "Gorteek Juan Carlos Borboikoa errege izendatzea",
    "theme": "Trantsizioa",
    "priority": 4
  },
  {
    "id": "event-095",
    "date": "1976",
    "sortKey": "1976-00-00",
    "label": "Platajunta sortzea",
    "theme": "Trantsizioa",
    "priority": 4
  },
  {
    "id": "event-096",
    "date": "1976-03-03",
    "sortKey": "1976-03-03",
    "label": "Gasteizko martxoaren 3ko gertaerak",
    "theme": "Trantsizioa",
    "priority": 4
  },
  {
    "id": "event-097",
    "date": "1976",
    "sortKey": "1976-00-00",
    "label": "Erreforma Politikorako Legea erreferendumean onartzea",
    "theme": "Trantsizioa",
    "priority": 5
  },
  {
    "id": "event-098",
    "date": "1977-06-15",
    "sortKey": "1977-06-15",
    "label": "Lehen hauteskunde demokratikoak",
    "theme": "Trantsizioa",
    "priority": 5
  },
  {
    "id": "event-099",
    "date": "1977-10",
    "sortKey": "1977-10-00",
    "label": "Moncloako Itunak",
    "theme": "Trantsizioa",
    "priority": 4
  },
  {
    "id": "event-100",
    "date": "1978-12-06",
    "sortKey": "1978-12-06",
    "label": "1978ko Konstituzioaren erreferenduma",
    "theme": "Trantsizioa",
    "priority": 5
  },
  {
    "id": "event-101",
    "date": "1978-12-29",
    "sortKey": "1978-12-29",
    "label": "1978ko Konstituzioa BOEn argitaratzea",
    "theme": "Trantsizioa",
    "priority": 5
  },
  {
    "id": "event-102",
    "date": "1979-10-25",
    "sortKey": "1979-10-25",
    "label": "Gernikako Estatutuaren erreferenduma",
    "theme": "Autonomia",
    "priority": 5
  },
  {
    "id": "event-103",
    "date": "1979-12-18",
    "sortKey": "1979-12-18",
    "label": "Euskal Herriko Autonomia Estatutua",
    "theme": "Autonomia",
    "priority": 5
  },
  {
    "id": "event-104",
    "date": "1980",
    "sortKey": "1980-00-00",
    "label": "Lehen Eusko Jaurlaritza autonomikoa",
    "theme": "Autonomia",
    "priority": 4
  },
  {
    "id": "event-105",
    "date": "1981",
    "sortKey": "1981-00-00",
    "label": "Kontzertu Ekonomikoa sinatzea",
    "theme": "Autonomia",
    "priority": 5
  },
  {
    "id": "event-106",
    "date": "1981-02-23",
    "sortKey": "1981-02-23",
    "label": "23-F estatu-kolpe saiakera",
    "theme": "Trantsizioa",
    "priority": 5
  },
  {
    "id": "event-107",
    "date": "1982-10",
    "sortKey": "1982-10-00",
    "label": "Felipe Gonzalezen gobernu aldaketa",
    "theme": "Trantsizioa",
    "priority": 4
  },
  {
    "id": "event-108",
    "date": "1909",
    "sortKey": "1909-07-00",
    "label": "Afrikako Gerra",
    "theme": "Berrezarkuntza",
    "priority": 5
  },
  {
    "id": "event-109",
    "date": "1931-04-14",
    "sortKey": "1931-04-14",
    "label": "Alfontso XIII.aren erbesteratzea",
    "theme": "II. Errepublika",
    "priority": 5
  }
] satisfies HistoryEvent[];

export const orderingSets = [
  {
    "id": "set-001",
    "title": "Estatu liberala",
    "eventIds": [
      "event-001",
      "event-003",
      "event-004",
      "event-005",
      "event-002"
    ],
    "priority": 5
  },
  {
    "id": "set-002",
    "title": "Estatu liberala",
    "eventIds": [
      "event-003",
      "event-004",
      "event-005",
      "event-002",
      "event-006"
    ],
    "priority": 5
  },
  {
    "id": "set-003",
    "title": "Estatu liberala",
    "eventIds": [
      "event-004",
      "event-005",
      "event-002",
      "event-006",
      "event-007"
    ],
    "priority": 5
  },
  {
    "id": "set-004",
    "title": "Estatu liberala",
    "eventIds": [
      "event-005",
      "event-002",
      "event-006",
      "event-007",
      "event-008"
    ],
    "priority": 5
  },
  {
    "id": "set-005",
    "title": "Estatu liberala",
    "eventIds": [
      "event-002",
      "event-006",
      "event-007",
      "event-008",
      "event-011"
    ],
    "priority": 5
  },
  {
    "id": "set-006",
    "title": "Estatu liberala",
    "eventIds": [
      "event-006",
      "event-007",
      "event-008",
      "event-011",
      "event-013"
    ],
    "priority": 5
  },
  {
    "id": "set-007",
    "title": "Estatu liberala",
    "eventIds": [
      "event-007",
      "event-008",
      "event-011",
      "event-013",
      "event-018"
    ],
    "priority": 5
  },
  {
    "id": "set-008",
    "title": "Foruak",
    "eventIds": [
      "event-012",
      "event-014",
      "event-015",
      "event-016",
      "event-017"
    ],
    "priority": 5
  },
  {
    "id": "set-009",
    "title": "Foruak",
    "eventIds": [
      "event-014",
      "event-015",
      "event-016",
      "event-017",
      "event-026"
    ],
    "priority": 5
  },
  {
    "id": "set-010",
    "title": "Foruak",
    "eventIds": [
      "event-015",
      "event-016",
      "event-017",
      "event-026",
      "event-030"
    ],
    "priority": 5
  },
  {
    "id": "set-011",
    "title": "Foruak",
    "eventIds": [
      "event-016",
      "event-017",
      "event-026",
      "event-030",
      "event-031"
    ],
    "priority": 5
  },
  {
    "id": "set-012",
    "title": "Industrializazioa",
    "eventIds": [
      "event-019",
      "event-021",
      "event-022",
      "event-035",
      "event-036"
    ],
    "priority": 4
  },
  {
    "id": "set-013",
    "title": "Berrezarkuntza",
    "eventIds": [
      "event-027",
      "event-028",
      "event-029",
      "event-040",
      "event-041"
    ],
    "priority": 5
  },
  {
    "id": "set-014",
    "title": "Berrezarkuntza",
    "eventIds": [
      "event-028",
      "event-029",
      "event-040",
      "event-041",
      "event-042"
    ],
    "priority": 5
  },
  {
    "id": "set-015",
    "title": "Berrezarkuntza",
    "eventIds": [
      "event-029",
      "event-040",
      "event-041",
      "event-042",
      "event-043"
    ],
    "priority": 5
  },
  {
    "id": "set-016",
    "title": "Berrezarkuntza",
    "eventIds": [
      "event-040",
      "event-041",
      "event-042",
      "event-043",
      "event-045"
    ],
    "priority": 5
  },
  {
    "id": "set-017",
    "title": "II. Errepublika",
    "eventIds": [
      "event-047",
      "event-049",
      "event-051",
      "event-048",
      "event-050"
    ],
    "priority": 5
  },
  {
    "id": "set-018",
    "title": "II. Errepublika",
    "eventIds": [
      "event-049",
      "event-051",
      "event-048",
      "event-050",
      "event-052"
    ],
    "priority": 5
  },
  {
    "id": "set-019",
    "title": "II. Errepublika",
    "eventIds": [
      "event-051",
      "event-048",
      "event-050",
      "event-052",
      "event-053"
    ],
    "priority": 5
  },
  {
    "id": "set-020",
    "title": "II. Errepublika",
    "eventIds": [
      "event-048",
      "event-050",
      "event-052",
      "event-053",
      "event-055"
    ],
    "priority": 5
  },
  {
    "id": "set-021",
    "title": "II. Errepublika",
    "eventIds": [
      "event-050",
      "event-052",
      "event-053",
      "event-055",
      "event-056"
    ],
    "priority": 4
  },
  {
    "id": "set-022",
    "title": "II. Errepublika",
    "eventIds": [
      "event-052",
      "event-053",
      "event-055",
      "event-056",
      "event-057"
    ],
    "priority": 5
  },
  {
    "id": "set-023",
    "title": "Autonomia",
    "eventIds": [
      "event-054",
      "event-061",
      "event-102",
      "event-103",
      "event-104"
    ],
    "priority": 5
  },
  {
    "id": "set-024",
    "title": "Autonomia",
    "eventIds": [
      "event-061",
      "event-102",
      "event-103",
      "event-104",
      "event-105"
    ],
    "priority": 5
  },
  {
    "id": "set-025",
    "title": "Gerra Zibila",
    "eventIds": [
      "event-058",
      "event-060",
      "event-059",
      "event-062",
      "event-063"
    ],
    "priority": 5
  },
  {
    "id": "set-026",
    "title": "Gerra Zibila",
    "eventIds": [
      "event-060",
      "event-059",
      "event-062",
      "event-063",
      "event-064"
    ],
    "priority": 5
  },
  {
    "id": "set-027",
    "title": "Gerra Zibila",
    "eventIds": [
      "event-059",
      "event-062",
      "event-063",
      "event-064",
      "event-065"
    ],
    "priority": 5
  },
  {
    "id": "set-028",
    "title": "Gerra Zibila",
    "eventIds": [
      "event-062",
      "event-063",
      "event-064",
      "event-065",
      "event-066"
    ],
    "priority": 5
  },
  {
    "id": "set-029",
    "title": "Gerra Zibila",
    "eventIds": [
      "event-063",
      "event-064",
      "event-065",
      "event-066",
      "event-067"
    ],
    "priority": 5
  },
  {
    "id": "set-030",
    "title": "Gerra Zibila",
    "eventIds": [
      "event-064",
      "event-065",
      "event-066",
      "event-067",
      "event-068"
    ],
    "priority": 5
  },
  {
    "id": "set-031",
    "title": "Gerra Zibila",
    "eventIds": [
      "event-065",
      "event-066",
      "event-067",
      "event-068",
      "event-069"
    ],
    "priority": 5
  },
  {
    "id": "set-032",
    "title": "Frankismoa",
    "eventIds": [
      "event-070",
      "event-071",
      "event-073",
      "event-074",
      "event-076"
    ],
    "priority": 5
  },
  {
    "id": "set-033",
    "title": "Frankismoa",
    "eventIds": [
      "event-071",
      "event-073",
      "event-074",
      "event-076",
      "event-077"
    ],
    "priority": 5
  },
  {
    "id": "set-034",
    "title": "Frankismoa",
    "eventIds": [
      "event-073",
      "event-074",
      "event-076",
      "event-077",
      "event-078"
    ],
    "priority": 4
  },
  {
    "id": "set-035",
    "title": "Frankismoa",
    "eventIds": [
      "event-074",
      "event-076",
      "event-077",
      "event-078",
      "event-079"
    ],
    "priority": 4
  },
  {
    "id": "set-036",
    "title": "Frankismoa",
    "eventIds": [
      "event-076",
      "event-077",
      "event-078",
      "event-079",
      "event-083"
    ],
    "priority": 4
  },
  {
    "id": "set-037",
    "title": "Frankismoa",
    "eventIds": [
      "event-077",
      "event-078",
      "event-079",
      "event-083",
      "event-084"
    ],
    "priority": 5
  },
  {
    "id": "set-038",
    "title": "Frankismoa",
    "eventIds": [
      "event-078",
      "event-079",
      "event-083",
      "event-084",
      "event-086"
    ],
    "priority": 5
  },
  {
    "id": "set-039",
    "title": "Frankismoa",
    "eventIds": [
      "event-079",
      "event-083",
      "event-084",
      "event-086",
      "event-087"
    ],
    "priority": 5
  },
  {
    "id": "set-040",
    "title": "Frankismoa",
    "eventIds": [
      "event-083",
      "event-084",
      "event-086",
      "event-087",
      "event-090"
    ],
    "priority": 5
  },
  {
    "id": "set-041",
    "title": "Frankismoa",
    "eventIds": [
      "event-084",
      "event-086",
      "event-087",
      "event-090",
      "event-091"
    ],
    "priority": 5
  },
  {
    "id": "set-042",
    "title": "Trantsizioa",
    "eventIds": [
      "event-094",
      "event-093",
      "event-095",
      "event-097",
      "event-096"
    ],
    "priority": 5
  },
  {
    "id": "set-043",
    "title": "Trantsizioa",
    "eventIds": [
      "event-093",
      "event-095",
      "event-097",
      "event-096",
      "event-098"
    ],
    "priority": 5
  },
  {
    "id": "set-044",
    "title": "Trantsizioa",
    "eventIds": [
      "event-095",
      "event-097",
      "event-096",
      "event-098",
      "event-099"
    ],
    "priority": 5
  },
  {
    "id": "set-045",
    "title": "Trantsizioa",
    "eventIds": [
      "event-097",
      "event-096",
      "event-098",
      "event-099",
      "event-100"
    ],
    "priority": 5
  },
  {
    "id": "set-046",
    "title": "Trantsizioa",
    "eventIds": [
      "event-096",
      "event-098",
      "event-099",
      "event-100",
      "event-101"
    ],
    "priority": 5
  },
  {
    "id": "set-047",
    "title": "Trantsizioa",
    "eventIds": [
      "event-098",
      "event-099",
      "event-100",
      "event-101",
      "event-106"
    ],
    "priority": 5
  },
  {
    "id": "set-048",
    "title": "Trantsizioa",
    "eventIds": [
      "event-099",
      "event-100",
      "event-101",
      "event-106",
      "event-107"
    ],
    "priority": 5
  },
  {
    "id": "set-049",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-001",
      "event-003",
      "event-004",
      "event-005",
      "event-002"
    ],
    "priority": 5
  },
  {
    "id": "set-050",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-004",
      "event-005",
      "event-002",
      "event-006",
      "event-007"
    ],
    "priority": 5
  },
  {
    "id": "set-051",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-002",
      "event-006",
      "event-007",
      "event-008",
      "event-009"
    ],
    "priority": 5
  },
  {
    "id": "set-052",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-007",
      "event-008",
      "event-009",
      "event-010",
      "event-011"
    ],
    "priority": 5
  },
  {
    "id": "set-053",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-009",
      "event-010",
      "event-011",
      "event-012",
      "event-013"
    ],
    "priority": 5
  },
  {
    "id": "set-054",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-011",
      "event-012",
      "event-013",
      "event-014",
      "event-015"
    ],
    "priority": 5
  },
  {
    "id": "set-055",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-013",
      "event-014",
      "event-015",
      "event-016",
      "event-017"
    ],
    "priority": 5
  },
  {
    "id": "set-056",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-015",
      "event-016",
      "event-017",
      "event-018",
      "event-020"
    ],
    "priority": 5
  },
  {
    "id": "set-057",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-017",
      "event-018",
      "event-020",
      "event-019",
      "event-021"
    ],
    "priority": 4
  },
  {
    "id": "set-058",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-020",
      "event-019",
      "event-021",
      "event-022",
      "event-023"
    ],
    "priority": 5
  },
  {
    "id": "set-059",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-021",
      "event-022",
      "event-023",
      "event-024",
      "event-025"
    ],
    "priority": 5
  },
  {
    "id": "set-060",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-023",
      "event-024",
      "event-025",
      "event-026",
      "event-027"
    ],
    "priority": 5
  },
  {
    "id": "set-061",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-025",
      "event-026",
      "event-027",
      "event-028",
      "event-029"
    ],
    "priority": 5
  },
  {
    "id": "set-062",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-027",
      "event-028",
      "event-029",
      "event-030",
      "event-031"
    ],
    "priority": 5
  },
  {
    "id": "set-063",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-029",
      "event-030",
      "event-031",
      "event-032",
      "event-033"
    ],
    "priority": 5
  },
  {
    "id": "set-064",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-031",
      "event-032",
      "event-033",
      "event-034",
      "event-035"
    ],
    "priority": 5
  },
  {
    "id": "set-065",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-033",
      "event-034",
      "event-035",
      "event-036",
      "event-037"
    ],
    "priority": 5
  },
  {
    "id": "set-066",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-035",
      "event-036",
      "event-037",
      "event-038",
      "event-039"
    ],
    "priority": 5
  },
  {
    "id": "set-067",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-037",
      "event-038",
      "event-039",
      "event-040",
      "event-041"
    ],
    "priority": 5
  },
  {
    "id": "set-068",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-039",
      "event-040",
      "event-041",
      "event-042",
      "event-043"
    ],
    "priority": 5
  },
  {
    "id": "set-069",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-041",
      "event-042",
      "event-043",
      "event-044",
      "event-045"
    ],
    "priority": 5
  },
  {
    "id": "set-070",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-043",
      "event-044",
      "event-045",
      "event-046",
      "event-047"
    ],
    "priority": 5
  },
  {
    "id": "set-071",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-045",
      "event-046",
      "event-047",
      "event-049",
      "event-051"
    ],
    "priority": 5
  },
  {
    "id": "set-072",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-047",
      "event-049",
      "event-051",
      "event-048",
      "event-050"
    ],
    "priority": 5
  },
  {
    "id": "set-073",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-051",
      "event-048",
      "event-050",
      "event-052",
      "event-053"
    ],
    "priority": 5
  },
  {
    "id": "set-074",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-050",
      "event-052",
      "event-053",
      "event-055",
      "event-054"
    ],
    "priority": 5
  },
  {
    "id": "set-075",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-053",
      "event-055",
      "event-054",
      "event-056",
      "event-057"
    ],
    "priority": 5
  },
  {
    "id": "set-076",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-054",
      "event-056",
      "event-057",
      "event-058",
      "event-060"
    ],
    "priority": 5
  },
  {
    "id": "set-077",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-057",
      "event-058",
      "event-060",
      "event-059",
      "event-061"
    ],
    "priority": 5
  },
  {
    "id": "set-078",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-060",
      "event-059",
      "event-061",
      "event-062",
      "event-063"
    ],
    "priority": 5
  },
  {
    "id": "set-079",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-061",
      "event-062",
      "event-063",
      "event-064",
      "event-065"
    ],
    "priority": 5
  },
  {
    "id": "set-080",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-063",
      "event-064",
      "event-065",
      "event-066",
      "event-067"
    ],
    "priority": 5
  },
  {
    "id": "set-081",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-065",
      "event-066",
      "event-067",
      "event-068",
      "event-069"
    ],
    "priority": 5
  },
  {
    "id": "set-082",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-067",
      "event-068",
      "event-069",
      "event-070",
      "event-071"
    ],
    "priority": 5
  },
  {
    "id": "set-083",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-069",
      "event-070",
      "event-071",
      "event-072",
      "event-073"
    ],
    "priority": 5
  },
  {
    "id": "set-084",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-071",
      "event-072",
      "event-073",
      "event-074",
      "event-075"
    ],
    "priority": 5
  },
  {
    "id": "set-085",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-073",
      "event-074",
      "event-075",
      "event-076",
      "event-077"
    ],
    "priority": 4
  },
  {
    "id": "set-086",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-075",
      "event-076",
      "event-077",
      "event-078",
      "event-079"
    ],
    "priority": 4
  },
  {
    "id": "set-087",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-077",
      "event-078",
      "event-079",
      "event-080",
      "event-082"
    ],
    "priority": 5
  },
  {
    "id": "set-088",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-079",
      "event-080",
      "event-082",
      "event-081",
      "event-083"
    ],
    "priority": 5
  },
  {
    "id": "set-089",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-082",
      "event-081",
      "event-083",
      "event-084",
      "event-085"
    ],
    "priority": 5
  },
  {
    "id": "set-090",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-083",
      "event-084",
      "event-085",
      "event-086",
      "event-087"
    ],
    "priority": 5
  },
  {
    "id": "set-091",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-085",
      "event-086",
      "event-087",
      "event-088",
      "event-089"
    ],
    "priority": 5
  },
  {
    "id": "set-092",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-087",
      "event-088",
      "event-089",
      "event-090",
      "event-091"
    ],
    "priority": 5
  },
  {
    "id": "set-093",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-089",
      "event-090",
      "event-091",
      "event-092",
      "event-094"
    ],
    "priority": 5
  },
  {
    "id": "set-094",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-091",
      "event-092",
      "event-094",
      "event-093",
      "event-095"
    ],
    "priority": 5
  },
  {
    "id": "set-095",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-094",
      "event-093",
      "event-095",
      "event-097",
      "event-096"
    ],
    "priority": 5
  },
  {
    "id": "set-096",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-095",
      "event-097",
      "event-096",
      "event-098",
      "event-099"
    ],
    "priority": 5
  },
  {
    "id": "set-097",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-096",
      "event-098",
      "event-099",
      "event-100",
      "event-101"
    ],
    "priority": 5
  },
  {
    "id": "set-098",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-099",
      "event-100",
      "event-101",
      "event-102",
      "event-103"
    ],
    "priority": 5
  },
  {
    "id": "set-099",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-101",
      "event-102",
      "event-103",
      "event-104",
      "event-105"
    ],
    "priority": 5
  },
  {
    "id": "set-100",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-103",
      "event-104",
      "event-105",
      "event-106",
      "event-107"
    ],
    "priority": 5
  },
  {
    "id": "set-101",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-001",
      "event-003",
      "event-004",
      "event-005",
      "event-002"
    ],
    "priority": 5
  },
  {
    "id": "set-102",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-004",
      "event-005",
      "event-002",
      "event-006",
      "event-007"
    ],
    "priority": 5
  },
  {
    "id": "set-103",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-002",
      "event-006",
      "event-007",
      "event-008",
      "event-009"
    ],
    "priority": 5
  },
  {
    "id": "set-104",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-007",
      "event-008",
      "event-009",
      "event-010",
      "event-011"
    ],
    "priority": 5
  },
  {
    "id": "set-105",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-009",
      "event-010",
      "event-011",
      "event-012",
      "event-013"
    ],
    "priority": 5
  },
  {
    "id": "set-106",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-011",
      "event-012",
      "event-013",
      "event-014",
      "event-015"
    ],
    "priority": 5
  },
  {
    "id": "set-107",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-013",
      "event-014",
      "event-015",
      "event-016",
      "event-017"
    ],
    "priority": 5
  },
  {
    "id": "set-108",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-015",
      "event-016",
      "event-017",
      "event-018",
      "event-020"
    ],
    "priority": 5
  },
  {
    "id": "set-109",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-017",
      "event-018",
      "event-020",
      "event-019",
      "event-021"
    ],
    "priority": 4
  },
  {
    "id": "set-110",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-020",
      "event-019",
      "event-021",
      "event-022",
      "event-023"
    ],
    "priority": 5
  },
  {
    "id": "set-111",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-021",
      "event-022",
      "event-023",
      "event-024",
      "event-025"
    ],
    "priority": 5
  },
  {
    "id": "set-112",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-023",
      "event-024",
      "event-025",
      "event-026",
      "event-027"
    ],
    "priority": 5
  },
  {
    "id": "set-113",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-025",
      "event-026",
      "event-027",
      "event-028",
      "event-029"
    ],
    "priority": 5
  },
  {
    "id": "set-114",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-027",
      "event-028",
      "event-029",
      "event-030",
      "event-031"
    ],
    "priority": 5
  },
  {
    "id": "set-115",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-029",
      "event-030",
      "event-031",
      "event-032",
      "event-033"
    ],
    "priority": 5
  },
  {
    "id": "set-116",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-031",
      "event-032",
      "event-033",
      "event-034",
      "event-035"
    ],
    "priority": 5
  },
  {
    "id": "set-117",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-033",
      "event-034",
      "event-035",
      "event-036",
      "event-037"
    ],
    "priority": 5
  },
  {
    "id": "set-118",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-035",
      "event-036",
      "event-037",
      "event-038",
      "event-039"
    ],
    "priority": 5
  },
  {
    "id": "set-119",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-037",
      "event-038",
      "event-039",
      "event-040",
      "event-041"
    ],
    "priority": 5
  },
  {
    "id": "set-120",
    "title": "Kronologia orokorra",
    "eventIds": [
      "event-039",
      "event-040",
      "event-041",
      "event-042",
      "event-043"
    ],
    "priority": 5
  }
] satisfies OrderingSet[];
