# 📊 Počítadlo Událostí

Soukromá webová aplikace pro sledování a analýzu osobních událostí s grafickou vizualizací.

## 🎯 Funkce

- ✅ **Zaznamenávání událostí** - Jednoduché přidání události jedním kliknutím
- 📊 **Interaktivní grafy** - Vizualizace dat pomocí Chart.js
  - Sloupcový graf
  - Koláčový graf
  - Graf typu kobliha
  - Časová osa (denní agregace)
- 📈 **Statistiky v reálném čase** - Celkový počet, dnes, unikátní typy
- 🔍 **Vyhledávání a filtrování** - Snadné hledání v historii
- ⚡ **Rychlá tlačítka** - Opakované události jedním kliknutím
- 💾 **Export/Import** - Záloha dat ve formátu JSON
- 🔒 **100% soukromé** - Data uložena pouze lokálně ve vašem prohlížeči

## 🚀 Jak aplikaci spustit

### 📱 Pro mobilní telefon (DOPORUČENO PRO MOBIL)
**Nejjednodušší způsob - jeden soubor:**

1. **Stáhněte soubor** `pocitadlo-mobil.html` na telefon
   - Z GitHubu: Otevřete soubor a klikněte na "Download" nebo "Raw" a uložte
   - Nebo použijte odkaz pro stažení

2. **Otevřete soubor v mobilním prohlížeči:**

   **📱 iPhone/iPad (iOS):**
   - Otevřete aplikaci **"Soubory"** (Files)
   - Najděte soubor `pocitadlo-mobil.html` ve složce "Stažené"
   - **Klikněte a podržte** na souboru (long press)
   - Vyberte **"Sdílet"** → **"Safari"**
   - NEBO: Klikněte na soubor → Klikněte "Sdílet" (ikona) → "Safari"

   **🤖 Android:**
   - Najděte soubor ve složce "Stažené soubory" nebo "Downloads"
   - Klikněte na něj - otevře se v prohlížeči (Chrome, Firefox)

3. **Přidejte si ho na plochu** (volitelné, ale doporučeno!)
   - **iOS Safari**: Tlačítko "Sdílet" → "Přidat na plochu"
   - **Android Chrome**: Menu (⋮) → "Přidat na plochu"
   - Pak budete mít ikonu jako skutečnou aplikaci! 📲

**DŮLEŽITÉ:**
- Funguje offline po prvním načtení
- Data jsou uložena pouze ve vašem telefonu
- Potřebujete internetové připojení pouze při prvním otevření (pro načtení grafů)

### 💻 Pro počítač

#### Metoda 1: Přímé otevření
1. Stáhněte všechny soubory do jedné složky:
   - `index.html`
   - `styles.css`
   - `app.js`
2. Dvakrát klikněte na soubor `index.html`
3. Aplikace se otevře ve vašem výchozím prohlížeči

#### Metoda 2: Lokální server (doporučeno)
Pokud máte nainstalovaný Python:

```bash
# Pro Python 3
python -m http.server 8000

# Pro Python 2
python -m SimpleHTTPServer 8000
```

Poté otevřete prohlížeč na adrese: `http://localhost:8000`

#### Metoda 3: VS Code Live Server
1. Otevřete složku ve Visual Studio Code
2. Nainstalujte rozšíření "Live Server"
3. Klikněte pravým tlačítkem na `index.html` → "Open with Live Server"

## 📖 Návod k použití

### Přidání události
1. Do pole "Název události" napište název (např. "Cvičení", "Káva", "Studium")
2. Klikněte na tlačítko "➕ Přidat událost" nebo stiskněte Enter
3. Událost je okamžitě zaznamenána s aktuálním časem

### Rychlé přidání události
- Po přidání první události se objeví rychlá tlačítka
- Kliknutím na tlačítko s názvem události ji okamžitě zaznamenáte

### Zobrazení grafů
1. **Typ grafu** - Vyberte si z:
   - Sloupcový (porovnání počtu událostí)
   - Koláčový (podíl jednotlivých typů)
   - Časová osa (vývoj v čase po dnech)
   - Kobliha (podíl s kruhovým zobrazením)

2. **Období** - Filtrujte data podle:
   - Vše (kompletní historie)
   - Dnes (jen dnešní události)
   - Tento týden (posledních 7 dní)
   - Tento měsíc (posledních 30 dní)

### Práce s daty

#### Export dat
1. Klikněte na "💾 Exportovat data"
2. Stáhne se JSON soubor s vašimi daty
3. Soubor obsahuje všechny události s časovými razítky

#### Import dat
1. Klikněte na "📁 Importovat data"
2. Vyberte dříve exportovaný JSON soubor
3. Data se přidají k existujícím záznamům

#### Smazání všech dat
1. Klikněte na "🗑️ Smazat vše"
2. Potvrďte akci (dvakrát pro bezpečnost)
3. Všechna data budou trvale smazána

## 🔐 Bezpečnost a soukromí

- **100% lokální** - Žádná data se neodesílají na internet
- **localStorage** - Data uložena pouze ve vašem prohlížeči
- **Žádné cookies** - Aplikace nepoužívá cookies
- **Offline funkční** - Po načtení funguje i bez internetu
- **Žádné sledování** - Žádná analytika ani sledování

### ⚠️ Důležité upozornění
- Data jsou uložena v prohlížeči (localStorage)
- Vymazání dat prohlížeče = ztráta všech záznamů
- **Doporučení**: Pravidelně exportujte data jako zálohu!

## 🛠️ Technologie

- **HTML5** - Struktura aplikace
- **CSS3** - Moderní responzivní design
- **JavaScript (ES6+)** - Logika aplikace
- **Chart.js** - Knihovna pro grafy (načítána z CDN)
- **localStorage** - Trvalé uložení dat

## 📱 Responzivní design

Aplikace je plně responzivní a funguje na:
- 💻 Počítačích (desktop)
- 📱 Mobilních telefonech
- 📟 Tabletech

## 🎨 Příklady použití

- 📚 **Sledování návyků** - Cvičení, čtení, meditace
- ☕ **Denní rutiny** - Káva, svačiny, přestávky
- 💊 **Zdraví** - Příjem léků, vitamínů
- 📊 **Produktivita** - Pomodoro, dokončené úkoly
- 🎮 **Koníčky** - Hraní her, sport, kreativní aktivity
- 📝 **Studium** - Studijní bloky, přečtené kapitoly

## 🔧 Přizpůsobení

Aplikaci můžete snadno přizpůsobit editací:

- **styles.css** - Změna barev, fontů, layoutu
- **app.js** - Přidání nových funkcí
- **index.html** - Úprava struktury a textu

### Změna barevného schématu
V souboru `styles.css` upravte CSS proměnné v `:root`:

```css
:root {
    --primary-color: #4f46e5;  /* Hlavní barva */
    --secondary-color: #10b981; /* Sekundární barva */
    --danger-color: #ef4444;    /* Barva pro smazání */
    /* ... */
}
```

## 🐛 Řešení problémů

### Graf se nezobrazuje
- Zkontrolujte připojení k internetu (Chart.js se načítá z CDN)
- Zkuste obnovit stránku (F5)

### Data zmizela
- Zkontrolujte, zda jste nevymazali data prohlížeče
- Importujte záložní JSON soubor

### Aplikace nefunguje
- Ujistěte se, že máte všechny 3 soubory (HTML, CSS, JS) ve stejné složce
- Otevřete konzoli prohlížeče (F12) a zkontrolujte chyby

## 📄 Licence

Tento projekt je volně použitelný pro osobní účely.

## 🤝 Podpora

Pro jakékoliv dotazy nebo problémy:
1. Zkontrolujte tento README
2. Podívejte se do konzole prohlížeče (F12)
3. Vytvořte zálohu dat před jakoukoli experimentací

---

**Vytvořeno pro soukromé použití** 🔒
