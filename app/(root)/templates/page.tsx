import { fetchTemplates } from "@/lib/actions/template.actions";

async function Templates({
}) {
  const result = await fetchTemplates();
  return (
    <div className="prose max-w-screen-2xl text-white">
      <div className="mb-10"><h2><strong className="text-white">Wprowadzenie</strong></h2>
      <p>Każda losowa mapa jest generowana zgodnie z pewnym szablonem. Szablon określa, na ile stref powinna być podzielona mapa, jak te strefy powinny być ze sobą połączone, a także pewne szczegóły dotyczące stref i połączeń, podczas gdy większość obiektów i dokładna lokalizacja stref jest wybierana losowo.</p>
      <h3><strong className="text-white">Notacja</strong></h3><h5><strong className="text-white">Ogólne</strong></h5>
      <p>Strefy są oznaczone kwadratami z zaokrąglonymi rogami. Rozmiar kwadratu pokazuje względny rozmiar strefy w odniesieniu do innych stref na szablonie (jednak rzeczywisty rozmiar strefy zależy od różnych czynników i może nie odpowiadać rozmiarowi wyświetlanemu na układzie).</p>
      <p></p><p>Kolor strefy odpowiada graczowi, którego miasto startowe znajduje się w tej strefie: zasada ta obowiązuje, jeśli gracze wybrali tylko pierwsze kolory (np. czerwony i niebieski dla dwóch graczy), w przeciwnym razie kolory stref nie odpowiadają kolorom graczy.</p>
      <p></p><p>Strefy niezajęte przez graczy są koloru białego (dla stref ubogich w zawartość), srebrnego (dla stref bogatych w zawartość) lub złotego (dla stref bardzo bogatych w zawartość).</p>
      <p></p><p>W prawym dolnym rogu kwadratu znajduje się numer, który jest identyfikatorem strefy.</p>
      <p>Ikona PC znajdująca się obok numeru strefy oznacza, że gracz rozpoczynający grę w tej strefie jest bezwzględnie kontrolowany przez SI.</p>
      <p></p><h5><strong className="text-white">Zawartość</strong></h5>
      <p>W lewym górnym rogu, obok ikony skrzyni, znajduje się liczba oznaczająca bogactwo zawartości danej strefy. Im większa jest ta liczba, tym więcej cennych przedmiotów wygeneruje ta strefa (i tym ciężsi będą strażnicy). Sama liczba określa, czy strefa będzie miała kolor biały, srebrny czy złoty.</p>
      <p>Zawartość każdej strefy charakteryzuje się trzema (lub mniej) typami zawartości. Każdy z tych typów jest opisany przez trzy liczby: minimalną wartość grupy, maksymalną wartość grupy i względną częstotliwość występowania. Od teraz każdy typ zawartości będzie oznaczany jako
      <strong className="text-white">([wartość minimalna]-[wartość maksymalna], [częstotliwość]).</strong>.</p>
      <p>Najczęściej używane zawartości strefy to:</p><ul><li><p>55 - strefa słaba, kolor biały. Typy zawartości: (500-3000, 9), (3000-6000, 6), (10000-15000, 1).</p></li>
      <li><p>133 - strefa bogata, srebrna. Typy zawartości: (3000-6000, 9), (10000-15000, 6), (15000-20000, 1).</p></li>
      <li><p>242 - bardzo bogata strefa, złota. Typy zawartości: (10000-15000, 9), (15000-20000, 6), (20000-30000, 1).</p></li></ul>
      <p>Gwiazdka nad liczbą bogactwa oznacza, że ta strefa używa niestandardowych zasad generowania obiektów.</p><p></p><p>Ikony mieczy w prawym górnym rogu oznaczają względną moc strażników. Brak mieczy oznacza, że obiekty w tej strefie nie są w ogóle strzeżone. W przeciwnym razie 1, 2 lub 3 miecze odpowiadają odpowiednio słabym, średnim lub silnym strażnikom.</p>
      <p></p><h5><strong className="text-white">Miasta i kopalnie</strong></h5>
      <p>W strefie może znajdować się wiele miast. Typ miasta (zamki - z fortem; niefortyfikowane, aka wioski - bez fortu) i ich ilość są oznaczone ikonami miast (zamki - z oknami; wioski - bez) i numerami obok nich. Miasta neutralne i kontrolowane przez gracza są również rozróżniane (miasta neutralne mają szare szczyty wież, podczas gdy miasta kontrolowane przez gracza mają szczyty wież w odpowiednim kolorze).</p>
      <p></p><p>Ilość każdego rodzaju kopalni znajduje się obok odpowiedniej ikony zasobu.</p><p></p>
      <h4><strong className="text-white">Połączenia</strong></h4>
      <p>Podstawowe połączenie między dwiema strefami jest oznaczone pojedynczą czarną linią. Liczba na niej to wartość połączenia, która określa siłę jednostek go strzegących. Połączenie ze Strażą Graniczną przecina kolejna krótsza linia w miejscu numeru.</p>
      <p></p><p>Szerokie połączenie jest oznaczone grubą szarą linią. To połączenie nigdy nie jest strzeżone, a jeśli strefy z nim połączone mają wspólną granicę lądową, będą połączone na większości szerokości tej granicy.</p>
      <p></p><p>Cienka przerywana linia oznacza fikcyjne połączenie: strefy nie będą faktycznie połączone, ale pomimo tego faktu generator spróbuje umieścić te strefy blisko siebie, jeśli to możliwe.</p><p></p>
      <p>Jeśli połączenie ma obowiązkową drogę, cienka biała przerywana linia jest dodawana wewnątrz linii połączenia. Należy pamiętać, że jeśli kilka połączeń z obowiązkowymi drogami występuje między tą samą parą stref, wygenerowana zostanie tylko jedna droga.</p><p></p>
      <p>Bezdrożne połączenia są oznaczone grubymi przerywanymi liniami.</p><p></p>
      <h4><strong className="text-white">Szablony lustrzane</strong></h4>
      <p>Szablony lustrzane mają warstwę podziemną wygenerowaną jako dokładna kopia poziomu powierzchni. Na układach szablonów strefy powierzchniowe są rysowane po lewej stronie, a podziemne - po prawej. Każda strefa powierzchniowa #x ma swoją podziemną kopię jako strefę #100+x.</p>
      <p>Zwróć uwagę, że prawa strona układu jest odwrócona do góry nogami - jeśli jakaś strefa znajduje się na górze części powierzchniowej, jej kopia będzie na dole części podziemnej.</p>
      <p>Połączenia między dwiema lustrzanymi warstwami są zaznaczone na czerwono.</p><p></p>
      <h4><strong className="text-white">Warunki istnienia</strong></h4>
      <p>Niektóre strefy i/lub połączenia na szablonie mogą mieć żółty kontur. Oznacza to, że ta strefa lub połączenie może, ale nie musi pojawić się podczas generowania, w zależności od ustawień mapy wybranych przed startem (liczba graczy, rozmiar mapy). W ten sposób kilka szablonów może być skonfigurowanych inaczej, w zależności od liczby graczy lub rozmiaru mapy.</p>
      <p></p><h3><strong className="text-white">Edytor szablonów</strong></h3>
      <p>Jeśli chcesz uzyskać bardziej szczegółowy widok dowolnego szablonu, możesz go otworzyć za pomocą wbudowanego edytora szablonów. W tym celu należy uruchomić<strong className="text-white">Rmg Template Editor.exe</strong> w katalogu głównym HotA, nacisnąć <strong className="text-white">Open</strong> i wybrać <strong className="text-white">HotA_RMGTemplates[nazwa szablonu]\rmg.txt.</strong>.</p>
      <p>Należy pamiętać, że istnieje wiele trybów widoku, które można przełączać za pomocą przycisków 1-5.</p>
      <p>1 - widok standardowy, opisany powyżej.</p><p></p><p>2 - widok miast i zamków. W tym trybie każda strefa wyświetla całkowitą liczbę miast i zamków, maksymalną dozwoloną liczbę miast (jeśli można wygenerować więcej niż standardowa liczba), dozwolony typ miast i zamków oraz powiadomienie, czy wszystkie miasta i zamki w strefie muszą należeć do tego samego typu.</p><p></p>
      <p>3 - widok skarbu. W tym trybie każda strefa wyświetla szczegółowy widok swojej zawartości: minimalną/maksymalną wartość i częstotliwość dla maksymalnie 3 rodzajów skarbów. Gwiazdka, podobnie jak w widoku standardowym, oznacza niestandardowe ustawienia lub ograniczenia generowania niektórych obiektów.</p><p></p>
      <p>4 - widok terenu/miejsca. W tym trybie każda strefa wyświetla dozwolone typy terenu, a także opcje rozmieszczenia, takie jak wymuszony poziom podziemny/powierzchniowy lub odpychanie strefy.</p><p></p>
      <p>5 - Widok identyfikatorów. W tym trybie identyfikator każdej strefy jest wyświetlany w dużej skali.</p><p></p>
      <p>Dwukrotne kliknięcie dowolnej strefy lub połączenia umożliwia ich edycję. Ustawienia ogólne można przeglądać w następujących zakładkach:<strong className="text-white">Template pack -&gt; Settings</strong> i <strong className="text-white">Template pack -&gt; Settings</strong>.</p>
      <h3><strong className="text-white">Ochrona przed modyfikacjami</strong></h3>
      <p>Szablony gracza-gospodarza są używane do generowania map podczas sesji wieloosobowych. Dlatego dołączający gracze muszą mieć środki, aby upewnić się, że szablon nie zawiera żadnych nieznanych modyfikacji.</p>
      <p>Na początku generowania nowej mapy wszyscy gracze porównują swoje szablony między sobą oraz z szablonem referencyjnym na serwerze HotA. Jeśli po sprawdzeniu nie pojawi się żaden komunikat, oznacza to, że host korzysta z szablonu, który jest zgodny z odpowiadającym mu szablonem lub odpowiadającym mu szablonem referencyjnym. Zakładając, że dołączający gracz ma domyślny szablon, oznacza to, że host również użył domyślnego szablonu do generowania mapy, a gracze mogą kontynuować.</p>
      <p>W przeciwnym razie użytkownikowi zostanie wyświetlony komunikat opisujący typ niezgodności i możliwe rozwiązania tego problemu.</p></div>
    </div>
  );
}

export default Templates;