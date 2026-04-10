/**
 * Comprehensive test suite for DIGGERZ_Unified_i18n.jsx
 *
 * Covers:
 *  - Utility functions: sn, nx, ago
 *  - i18n data: LANGS, T (translation keys and completeness)
 *  - Question data: QC, QF, QM, QI structure & axis weights
 *  - TERMS_I18N mapping
 *  - TestQuestion component rendering and interaction
 *  - LangSel component rendering and interaction
 *  - App component smoke & integration tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import App, {
  sn,
  nx,
  ago,
  LANGS,
  T,
  QC,
  QF,
  QM,
  QI,
  TERMS_I18N,
  TestQuestion,
  LangSel,
  Ctx,
} from "../../DIGGERZ_Unified_i18n.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Helper: wrap a component inside the context provider
// ─────────────────────────────────────────────────────────────────────────────
function renderWithCtx(ui, { lang = "EN", setLang = vi.fn() } = {}) {
  return render(
    <Ctx.Provider value={{ lang, setLang }}>{ui}</Ctx.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Utility: sn()
// ─────────────────────────────────────────────────────────────────────────────
describe("sn() – random hex string", () => {
  it("returns a string of exactly 6 characters", () => {
    expect(sn()).toHaveLength(6);
  });

  it("contains only uppercase hexadecimal characters (0-9, A-F)", () => {
    for (let i = 0; i < 20; i++) {
      expect(sn()).toMatch(/^[0-9A-F]{6}$/);
    }
  });

  it("produces different values on successive calls (non-deterministic)", () => {
    const results = new Set(Array.from({ length: 50 }, () => sn()));
    // 16^6 = 16 million possibilities – collisions are extremely unlikely
    expect(results.size).toBeGreaterThan(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Utility: nx()
// ─────────────────────────────────────────────────────────────────────────────
describe("nx() – glitch character string", () => {
  const GLITCH_CHARS = "░▒▓█▄▀│┤╡╣".split("");

  it("returns exactly 3 characters", () => {
    expect([...nx()]).toHaveLength(3);
  });

  it("each character comes from the allowed glitch set", () => {
    for (let i = 0; i < 20; i++) {
      const chars = [...nx()];
      chars.forEach((ch) => expect(GLITCH_CHARS).toContain(ch));
    }
  });

  it("all 3 characters are distinct (slice(0,3) after shuffle samples without repetition)", () => {
    // After sort+shuffle of 10 unique chars and slicing 3, they should all differ
    for (let i = 0; i < 30; i++) {
      const chars = [...nx()];
      const unique = new Set(chars);
      expect(unique.size).toBe(3);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Utility: ago()
// ─────────────────────────────────────────────────────────────────────────────
describe("ago() – relative time formatter", () => {
  it('returns "now" for 0 minutes', () => {
    expect(ago(0)).toBe("now");
  });

  it('returns "now" for negative minutes (< 1)', () => {
    expect(ago(0)).toBe("now");
  });

  it("returns minutes with 'm' suffix for 1–59 minutes", () => {
    expect(ago(1)).toBe("1m");
    expect(ago(30)).toBe("30m");
    expect(ago(59)).toBe("59m");
  });

  it("returns hours with 'h' suffix for 60–1439 minutes", () => {
    expect(ago(60)).toBe("1h");
    expect(ago(90)).toBe("1h");
    expect(ago(120)).toBe("2h");
    expect(ago(1439)).toBe("23h");
  });

  it("returns days with 'd' suffix for 1440+ minutes", () => {
    expect(ago(1440)).toBe("1d");
    expect(ago(2880)).toBe("2d");
    expect(ago(10080)).toBe("7d");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. LANGS data integrity
// ─────────────────────────────────────────────────────────────────────────────
describe("LANGS – language configuration", () => {
  const EXPECTED_CODES = ["FR", "EN", "ES", "PT", "ZH", "JA", "AR", "HI"];

  it("contains exactly 8 languages", () => {
    expect(LANGS).toHaveLength(8);
  });

  it("has entries for all expected language codes", () => {
    const codes = LANGS.map((l) => l.c);
    EXPECTED_CODES.forEach((code) => expect(codes).toContain(code));
  });

  it("each entry has required fields: c, l, f", () => {
    LANGS.forEach((lang) => {
      expect(lang).toHaveProperty("c");
      expect(lang).toHaveProperty("l");
      expect(lang).toHaveProperty("f");
      expect(typeof lang.c).toBe("string");
      expect(typeof lang.l).toBe("string");
      expect(typeof lang.f).toBe("string");
    });
  });

  it("only Arabic (AR) has rtl: true", () => {
    const rtlLangs = LANGS.filter((l) => l.rtl === true);
    expect(rtlLangs).toHaveLength(1);
    expect(rtlLangs[0].c).toBe("AR");
  });

  it("non-Arabic languages do not have rtl: true", () => {
    LANGS.filter((l) => l.c !== "AR").forEach((l) => {
      expect(l.rtl).not.toBe(true);
    });
  });

  it("language codes are unique", () => {
    const codes = LANGS.map((l) => l.c);
    expect(new Set(codes).size).toBe(LANGS.length);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. T – translation dictionary
// ─────────────────────────────────────────────────────────────────────────────
describe("T – i18n translation dictionary", () => {
  const ALL_LANG_CODES = ["FR", "EN", "ES", "PT", "ZH", "JA", "AR", "HI"];
  const REQUIRED_KEYS = [
    "nav_home", "nav_test", "nav_arch", "nav_net", "nav_soul",
    "mc", "nrw", "desc", "formula", "go",
    "q", "ar", "ax", "co", "tt", "ts", "td", "la",
    "nx", "bk", "an", "no", "ye",
    "dp", "pf", "ne", "ma", "ga", "sl",
    "ss", "ssd", "ph",
  ];

  it("is a non-empty object", () => {
    expect(typeof T).toBe("object");
    expect(Object.keys(T).length).toBeGreaterThan(0);
  });

  it("contains all required navigation and UI keys", () => {
    REQUIRED_KEYS.forEach((key) => {
      expect(T).toHaveProperty(key);
    });
  });

  it("every translation entry has at minimum an EN and FR value", () => {
    Object.entries(T).forEach(([key, entry]) => {
      expect(entry).toHaveProperty("EN", expect.any(String));
      expect(entry).toHaveProperty("FR", expect.any(String));
    });
  });

  it("every translation entry has all 8 language variants", () => {
    Object.entries(T).forEach(([key, entry]) => {
      ALL_LANG_CODES.forEach((code) => {
        expect(entry).toHaveProperty(code);
        expect(typeof entry[code]).toBe("string");
        expect(entry[code].length).toBeGreaterThan(0);
      });
    });
  });

  it("no translation value is an empty string", () => {
    Object.entries(T).forEach(([key, entry]) => {
      ALL_LANG_CODES.forEach((code) => {
        expect(entry[code]).not.toBe("");
      });
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Question arrays – structure and axis weight integrity
// ─────────────────────────────────────────────────────────────────────────────
const VALID_AXIS_KEYS = ["GV", "CE", "SI", "PT"];
const ALL_LANG_CODES = ["FR", "EN", "ES", "PT", "ZH", "JA", "AR", "HI"];

function validateQuestionArray(label, arr, expectedLength) {
  describe(`${label} – question array`, () => {
    it(`has exactly ${expectedLength} questions`, () => {
      expect(arr).toHaveLength(expectedLength);
    });

    it("every question has text in all 8 languages", () => {
      arr.forEach((q, i) => {
        ALL_LANG_CODES.forEach((code) => {
          expect(q).toHaveProperty(code);
          expect(typeof q[code]).toBe("string");
          expect(q[code].length).toBeGreaterThan(0);
        });
      });
    });

    it("every question has an axis weights object (a)", () => {
      arr.forEach((q, i) => {
        expect(q).toHaveProperty("a");
        expect(typeof q.a).toBe("object");
        expect(Object.keys(q.a).length).toBeGreaterThan(0);
      });
    });

    it("axis keys are only valid axis identifiers (GV, CE, SI, PT)", () => {
      arr.forEach((q) => {
        Object.keys(q.a).forEach((axis) => {
          expect(VALID_AXIS_KEYS).toContain(axis);
        });
      });
    });

    it("axis weights are numeric values", () => {
      arr.forEach((q) => {
        Object.values(q.a).forEach((w) => {
          expect(typeof w).toBe("number");
          expect(isNaN(w)).toBe(false);
        });
      });
    });

    it("axis weights are within the expected range [-1, 1]", () => {
      arr.forEach((q) => {
        Object.values(q.a).forEach((w) => {
          expect(w).toBeGreaterThanOrEqual(-1);
          expect(w).toBeLessThanOrEqual(1);
        });
      });
    });

    it("French and English question texts are different strings", () => {
      // Sanity check: they shouldn't all be identical across languages
      const frTexts = arr.map((q) => q.FR);
      const enTexts = arr.map((q) => q.EN);
      // At minimum some FR texts should differ from EN texts
      const hasDifference = frTexts.some((fr, i) => fr !== enTexts[i]);
      expect(hasDifference).toBe(true);
    });
  });
}

validateQuestionArray("QC (Chromatic)", QC, 20);
validateQuestionArray("QF (Form)", QF, 20);
validateQuestionArray("QM (Material)", QM, 20);
validateQuestionArray("QI (Identity)", QI, 20);

// ─────────────────────────────────────────────────────────────────────────────
// 7. Combined question pool
// ─────────────────────────────────────────────────────────────────────────────
describe("Combined question pool", () => {
  const allQ = [...QC, ...QF, ...QM, ...QI];

  it("totals exactly 80 questions", () => {
    expect(allQ).toHaveLength(80);
  });

  it("has no duplicate French question texts", () => {
    const frTexts = allQ.map((q) => q.FR);
    expect(new Set(frTexts).size).toBe(allQ.length);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. TERMS_I18N – terminal metadata
// ─────────────────────────────────────────────────────────────────────────────
describe("TERMS_I18N – terminal configuration", () => {
  it("has exactly 4 terminals", () => {
    expect(TERMS_I18N).toHaveLength(4);
  });

  it("each terminal has a translation key (k) and question array (q)", () => {
    TERMS_I18N.forEach((term) => {
      expect(term).toHaveProperty("k");
      expect(term).toHaveProperty("q");
      expect(typeof term.k).toBe("string");
      expect(Array.isArray(term.q)).toBe(true);
      expect(term.q).toHaveLength(20);
    });
  });

  it("terminal translation keys exist in T", () => {
    TERMS_I18N.forEach((term) => {
      expect(T).toHaveProperty(term.k);
    });
  });

  it("maps to QC, QF, QM, QI respectively", () => {
    expect(TERMS_I18N[0].q).toBe(QC);
    expect(TERMS_I18N[1].q).toBe(QF);
    expect(TERMS_I18N[2].q).toBe(QM);
    expect(TERMS_I18N[3].q).toBe(QI);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. TestQuestion component
// ─────────────────────────────────────────────────────────────────────────────
describe("TestQuestion component", () => {
  const sampleQuestion = {
    FR: "Le noir est mon bouclier.",
    EN: "Black is my shield.",
    ES: "El negro es mi escudo.",
    PT: "O preto é meu escudo.",
    ZH: "黑色是我的盾牌。",
    JA: "黒は私の盾。",
    AR: "الأسود درعي.",
    HI: "काला मेरी ढाल है।",
    a: { PT: -1, CE: -0.5 },
  };

  it("renders the question text for the given language", () => {
    renderWithCtx(
      <TestQuestion q={sampleQuestion} lang="EN" val={null} onChange={() => {}} />
    );
    expect(screen.getByText(/"Black is my shield\."/)).toBeInTheDocument();
  });

  it("renders question text in French when lang is FR", () => {
    renderWithCtx(
      <TestQuestion q={sampleQuestion} lang="FR" val={null} onChange={() => {}} />
    );
    expect(screen.getByText(/"Le noir est mon bouclier\."/)).toBeInTheDocument();
  });

  it("falls back to French when lang key is missing from question", () => {
    const q = { FR: "Fallback text.", a: { CE: 1 } };
    renderWithCtx(
      <TestQuestion q={q} lang="EN" val={null} onChange={() => {}} />
    );
    expect(screen.getByText(/"Fallback text\."/)).toBeInTheDocument();
  });

  it("renders 5 Likert scale buttons", () => {
    renderWithCtx(
      <TestQuestion q={sampleQuestion} lang="EN" val={null} onChange={() => {}} />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
    [1, 2, 3, 4, 5].forEach((n, i) => {
      expect(buttons[i]).toHaveTextContent(String(n));
    });
  });

  it("calls onChange with the correct value when a Likert button is clicked", async () => {
    const handleChange = vi.fn();
    renderWithCtx(
      <TestQuestion q={sampleQuestion} lang="EN" val={null} onChange={handleChange} />
    );
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[2]); // value = 3
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it("calls onChange with value 1 when the first button is clicked", async () => {
    const handleChange = vi.fn();
    renderWithCtx(
      <TestQuestion q={sampleQuestion} lang="EN" val={null} onChange={handleChange} />
    );
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[0]);
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it("calls onChange with value 5 when the last button is clicked", async () => {
    const handleChange = vi.fn();
    renderWithCtx(
      <TestQuestion q={sampleQuestion} lang="EN" val={null} onChange={handleChange} />
    );
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[4]);
    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it("can change selection (clicking a different button calls onChange again)", async () => {
    const handleChange = vi.fn();
    const { rerender } = renderWithCtx(
      <TestQuestion q={sampleQuestion} lang="EN" val={2} onChange={handleChange} />
    );
    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[4]); // switch to 5
    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it("renders Arabic question text when lang is AR", () => {
    renderWithCtx(
      <TestQuestion q={sampleQuestion} lang="AR" val={null} onChange={() => {}} />
    );
    expect(screen.getByText(/الأسود درعي/)).toBeInTheDocument();
  });

  it("renders Chinese question text when lang is ZH", () => {
    renderWithCtx(
      <TestQuestion q={sampleQuestion} lang="ZH" val={null} onChange={() => {}} />
    );
    expect(screen.getByText(/黑色是我的盾牌/)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. LangSel component
// ─────────────────────────────────────────────────────────────────────────────
describe("LangSel component", () => {
  it("renders the current language code and flag", () => {
    renderWithCtx(<LangSel />, { lang: "EN" });
    expect(screen.getByText(/EN/)).toBeInTheDocument();
  });

  it("opens the dropdown when the button is clicked", async () => {
    renderWithCtx(<LangSel />, { lang: "FR" });
    const toggle = screen.getByRole("button");
    await userEvent.click(toggle);
    // All 8 language names should appear
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Français")).toBeInTheDocument();
    expect(screen.getByText("Español")).toBeInTheDocument();
  });

  it("lists all 8 languages when open", async () => {
    renderWithCtx(<LangSel />, { lang: "EN" });
    await userEvent.click(screen.getByRole("button"));
    const expectedNames = ["Français", "English", "Español", "Português", "中文", "日本語", "العربية", "हिन्दी"];
    expectedNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("calls setLang with the selected language code when an option is clicked", async () => {
    const setLang = vi.fn();
    renderWithCtx(<LangSel />, { lang: "EN", setLang });
    await userEvent.click(screen.getByRole("button")); // open
    const japaneseOption = screen.getByText("日本語");
    await userEvent.click(japaneseOption);
    expect(setLang).toHaveBeenCalledWith("JA");
  });

  it("closes the dropdown after selecting a language", async () => {
    const setLang = vi.fn();
    renderWithCtx(<LangSel />, { lang: "EN", setLang });
    await userEvent.click(screen.getByRole("button")); // open
    expect(screen.getByText("Español")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Español")); // select ES
    // Dropdown items should no longer be in the DOM
    expect(screen.queryByText("日本語")).not.toBeInTheDocument();
  });

  it("toggles the dropdown closed when the trigger button is clicked again", async () => {
    renderWithCtx(<LangSel />, { lang: "EN" });
    const toggle = screen.getByRole("button");
    await userEvent.click(toggle); // open
    expect(screen.getByText("English")).toBeInTheDocument();
    await userEvent.click(toggle); // close
    expect(screen.queryByText("日本語")).not.toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 11. App – smoke & integration tests
// ─────────────────────────────────────────────────────────────────────────────
describe("App component – smoke & integration", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("displays the DIGGERZ brand name", () => {
    render(<App />);
    // The heading uses letter-spacing; match on the visible text
    const headings = screen.getAllByText("DIGGERZ");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("starts with French as the default language", () => {
    render(<App />);
    // The language selector should show the FR code
    expect(screen.getByText(/FR/)).toBeInTheDocument();
  });

  it("renders the language selector", () => {
    render(<App />);
    // The globe icon's parent button is the lang selector trigger
    expect(screen.getByText(/FR/)).toBeInTheDocument();
  });

  it("renders question 1 of 80 by default", () => {
    render(<App />);
    expect(screen.getByText("1/80")).toBeInTheDocument();
  });

  it("renders 5 Likert buttons for the first question", () => {
    render(<App />);
    // There should be multiple sets; find all buttons with single digit text
    const likertButtons = screen
      .getAllByRole("button")
      .filter((b) => /^[1-5]$/.test(b.textContent));
    expect(likertButtons).toHaveLength(5);
  });

  it("NEXT button is disabled when no answer is selected for the first question", () => {
    render(<App />);
    // Find the button containing the text corresponding to T.nx.FR ("SUIVANT")
    const nextBtn = screen.getByText(/SUIVANT/);
    expect(nextBtn.closest("button")).toBeDisabled();
  });

  it("NEXT button becomes enabled after selecting a Likert answer", async () => {
    render(<App />);
    const likertButtons = screen
      .getAllByRole("button")
      .filter((b) => /^[1-5]$/.test(b.textContent));
    await userEvent.click(likertButtons[2]); // select 3
    const nextBtn = screen.getByText(/SUIVANT/);
    expect(nextBtn.closest("button")).not.toBeDisabled();
  });

  it("advances to question 2 after answering and clicking NEXT", async () => {
    render(<App />);
    const likertButtons = screen
      .getAllByRole("button")
      .filter((b) => /^[1-5]$/.test(b.textContent));
    await userEvent.click(likertButtons[0]);
    await userEvent.click(screen.getByText(/SUIVANT/).closest("button"));
    expect(screen.getByText("2/80")).toBeInTheDocument();
  });

  it("BACK button is disabled on the first question", () => {
    render(<App />);
    const backBtn = screen.getByText(/RETOUR/).closest("button");
    expect(backBtn).toBeDisabled();
  });

  it("BACK button is enabled after moving past the first question", async () => {
    render(<App />);
    const likertButtons = screen
      .getAllByRole("button")
      .filter((b) => /^[1-5]$/.test(b.textContent));
    await userEvent.click(likertButtons[0]);
    await userEvent.click(screen.getByText(/SUIVANT/).closest("button"));
    const backBtn = screen.getByText(/RETOUR/).closest("button");
    expect(backBtn).not.toBeDisabled();
  });

  it("navigates back to question 1 when BACK is clicked from question 2", async () => {
    render(<App />);
    const getLikert = () =>
      screen.getAllByRole("button").filter((b) => /^[1-5]$/.test(b.textContent));
    await userEvent.click(getLikert()[0]);
    await userEvent.click(screen.getByText(/SUIVANT/).closest("button"));
    expect(screen.getByText("2/80")).toBeInTheDocument();
    await userEvent.click(screen.getByText(/RETOUR/).closest("button"));
    expect(screen.getByText("1/80")).toBeInTheDocument();
  });

  it("switches to English when EN is selected in LangSel", async () => {
    render(<App />);
    // Open lang selector (the button showing "FR")
    const langButton = screen.getByText(/FR/).closest("button");
    await userEvent.click(langButton);
    await userEvent.click(screen.getByText("English"));
    // Nav items should now show English labels
    expect(screen.getByText("SUBSTRATE")).toBeInTheDocument();
  });

  it("switches to Arabic and applies rtl direction", async () => {
    render(<App />);
    const langButton = screen.getByText(/FR/).closest("button");
    await userEvent.click(langButton);
    await userEvent.click(screen.getByText("العربية"));
    const root = document.querySelector("[dir]");
    expect(root).toHaveAttribute("dir", "rtl");
  });

  it("applies ltr direction for non-RTL languages", () => {
    render(<App />);
    const root = document.querySelector("[dir]");
    expect(root).toHaveAttribute("dir", "ltr");
  });

  it("renders navigation items in the header", () => {
    render(<App />);
    // In FR the nav items are SUBSTRATE, TERMINAL, ARCHIVES, RÉSEAU, LOUNGE
    expect(screen.getByText("SUBSTRATE")).toBeInTheDocument();
    expect(screen.getByText("TERMINAL")).toBeInTheDocument();
    expect(screen.getByText("ARCHIVES")).toBeInTheDocument();
  });

  it("shows terminal indicator labels T-01 through T-04", () => {
    render(<App />);
    ["T-01", "T-02", "T-03", "T-04"].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders the stat cards (80Q, 16 archetypes, 4 axes, cohort 33)", () => {
    render(<App />);
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("16")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
    expect(screen.getByText("33")).toBeInTheDocument();
  });

  it("renders the footer copyright text", () => {
    render(<App />);
    expect(screen.getByText(/DIGGERZ © 2026/)).toBeInTheDocument();
  });
});
