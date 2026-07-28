# Μετάβαση στη φόρμα v2 — σημειώσεις

**Ημερομηνία:** 2026-07-28
**Κατάσταση:** Η v2 φόρμα (`/dashboard/services/new-v2`, `src/pages/RepairFormV2Page.js`) είναι πλέον ο **μοναδικός** τρόπος δημιουργίας νέας επισκευής. Η παλιά φόρμα δημιουργίας (`CreateRepairForm.js`, modal) διαγράφηκε.

## Τι ελέγχθηκε πριν τη διαγραφή

Πριν διαγραφεί οτιδήποτε, έγινε λεπτομερής σύγκριση παλιάς/νέας φόρμας δημιουργίας (πεδία που γράφονται στη βάση, validation, μοντέλο). Αποτέλεσμα:

- **Βασικά Στοιχεία, Τεχνικά Χαρακτηριστικά, Περιγραφή Βλάβης, Φωτογραφίες, Κόστος & Παράδοση**: 100% ίδια — και οι δύο φόρμες χρησιμοποιούσαν **τα ίδια ακριβώς αρχεία** (`BasicInfo.js`, `TechnicalCharacteristics.js`, `Issues.js`, `Photos.js`, `CostAndDelivery.js`), ίδιο validation (`customer.name`, `motor.manufacturer` υποχρεωτικά + όριο 10MB φωτογραφιών), ίδιο `new Repair(repair)` πριν το `RepairRepository.createNewRepair`.
- **Στοιχεία Περιέλιξης — Ολόκληρο / Μισό-Μισό**: ίδια ονόματα πεδίων (`motor.step`, `motor.spiral`, `motor.coilsCount`, κ.λπ.) και στις δύο φόρμες. Μόνη διαφορά: η νέα φόρμα δείχνει προαιρετικό πεδίο "Πόσες μαζί" και σε μονοφασικά μοτέρ (ειδική περίπτωση βήματος "1-Ν"), κάτι που η παλιά φόρμα δεν υποστήριζε καθόλου δομικά. Είναι προσθήκη δυνατότητας, όχι απώλεια δεδομένων.
- **Στοιχεία Περιέλιξης — Συνδυασμός (⚠️ βλ. παρακάτω)**: η μόνη πραγματική διαφορά δομής δεδομένων.

## ⚠️ Το ζήτημα: "Συνδυασμός" (combined) — διαφορετική δομή δεδομένων

Παράδειγμα: τριφασικός κινητήρας, βήμα "8" (μισό), "10" και "12" (ολόκληρα), σπείρες 50/100/100, διατομή "1.20/10".

**Παλιά φόρμα** (`WindingsContentFields.js`, ακόμα ζωντανή — τη χρησιμοποιεί το `EditRepairForm.js`) — δύο ανεξάρτητες εγγραφές:
```
motor.halfStep = "8"
motor.halfSpiral = "50"
motor.step = "10-12"
motor.spiral = "100-100"

motorCrossSectionLinks = [
  { crossSection: "1.20/10", type: "half" },
  { crossSection: "1.20/10", type: "standard" }
]
```

**Νέα φόρμα** (`CombinedStepBuilder.js`, μέσω `WindingsContentFieldsV2.js`) — μία ενοποιημένη ακολουθία:
```
motor.step = "8-10-12"
motor.halfStep = "8"          // ποιοι αριθμοί της ακολουθίας είναι "μισό"
motor.spiral = "50-100-100"

motorCrossSectionLinks = [
  { crossSection: "1.20/10", type: "standard" }   // ΠΟΤΕ "half" στη νέα φόρμα
]
```

`motor.halfSpiral` και `motor.halfCoilsCount` δεν γράφονται πλέον καθόλου στη νέα φόρμα — η σπείρα του "μισού" αριθμού είναι μέσα στο ενιαίο `motor.spiral`, στη σωστή θέση.

**Γιατί άλλαξε έτσι:** φυσικά ένα πηνίο "Συνδυασμός" είναι ΕΝΑ πηνίο με ΜΙΑ διατομή (πάχος σύρματος) — η παλιά φόρμα το αναπαριστούσε λανθασμένα σαν δύο ξεχωριστά πηνία, επιτρέποντας να μπουν κατά λάθος δύο διαφορετικές διατομές σε κάτι που στην πραγματικότητα είναι ένα σύρμα.

**Η ανάγνωση είναι ήδη ασφαλής:** το `src/configs/motor.js` ξέρει να διαβάζει και τις δύο μορφές (ελέγχει και `halfSpiral`/`spiral`, και `crossHalf`/`crossStandard`), οπότε παλιές εγγραφές συνεχίζουν να εμφανίζονται σωστά παντού (λίστα επισκευών, λεπτομέρειες, κ.λπ.).

## 🔴 TODO πριν μεταφερθεί το Edit στα νέα winding components

Το `EditRepairForm.js` χρησιμοποιεί ακόμα τα ΠΑΛΙΑ winding components (`DetailsWinding.js`, `WindingsContentFields.js`, `TypeOfStepField.js`, και τα παλιά `winding/parts/{ThreePhaseFields,OnePhaseFields,StepField,CrossSectionField,CoilsCount}.js`). **Αυτό είναι σκόπιμο και πρέπει να μείνει έτσι προς το παρόν.**

Αν το `EditRepairForm.js` μεταφερθεί απευθείας στο `WindingsContentFieldsV2`/`CombinedStepBuilder` **χωρίς προεργασία**, τότε το άνοιγμα μιας ΠΑΛΙΑΣ εγγραφής "Συνδυασμός" για επεξεργασία θα δείχνει **ελλιπή** δεδομένα: το νέο component διαβάζει μόνο το `motor.step` για να αποφασίσει ποιοι αριθμοί υπάρχουν (στο παράδειγμα: "10", "12"), και το "8"/μισό κομμάτι (με τη σπείρα του, "50") **θα εξαφανιστεί εντελώς από την οθόνη**, χωρίς σφάλμα. Αν ο τεχνικός δεν το προσέξει και αποθηκεύσει, χάνεται/μένει κρυφό κομμάτι της περιέλιξης.

**Συμφωνημένη λύση** (δεν έχει χτιστεί ακόμα): ένας μικρός **normalize/adapter** που τρέχει όταν ανοίγει το Edit για εγγραφή τύπου "Συνδυασμός" —
1. Ανιχνεύει αν η εγγραφή είναι στην ΠΑΛΙΑ μορφή (ευρετικά: υπάρχουν αριθμοί στο `halfStep` που ΔΕΝ περιέχονται ήδη στο `step`).
2. Αν ναι, τη "συγχωνεύει" στη νέα ενοποιημένη μορφή στη μνήμη πριν φανεί στη φόρμα (χωρίς αλλαγή στη βάση/schema).
3. Κάθε εγγραφή έτσι "αυτο-αναβαθμίζεται" στη νέα μορφή μόνο όταν πραγματικά ανοιχτεί/αποθηκευτεί ξανά — όχι μαζικό migration.

Πριν χτιστεί, πρέπει να επαληθευτεί η ευρετική σε πραγματικές παλιές εγγραφές "Συνδυασμός" από τη βάση (όχι μόνο θεωρητικά).

**Μέχρι να χτιστεί ο adapter, ΜΗΝ διαγραφούν:**
- `src/components/layout/form/parts/DetailsWinding.js`
- `src/components/layout/form/parts/WindingsContentFields.js`
- `src/components/layout/form/parts/TypeOfStepField.js`
- `src/components/layout/form/parts/winding/parts/ThreePhaseFields.js`
- `src/components/layout/form/parts/winding/parts/OnePhaseFields.js`
- `src/components/layout/form/parts/winding/parts/StepField.js`
- `src/components/layout/form/parts/winding/parts/CrossSectionField.js`
- `src/components/layout/form/parts/winding/parts/CoilsCount.js`

(`winding/parts/CombinedStepBuilder.js` ΔΕΝ είναι στη λίστα — το χρησιμοποιεί ενεργά και η v2 φόρμα, δεν διαγράφεται ποτέ.)

## Τι έγινε σε αυτό το πέρασμα (διαγραφή παλιάς φόρμας ΔΗΜΙΟΥΡΓΙΑΣ)

- Διαγράφηκε: `src/components/layout/form/CreateRepairForm.js`.
- `ModalRepairForm.js`: έγινε μόνο για επεξεργασία (Edit) — δεν υπάρχει πια το "δημιουργία" branch.
- `Layout.js`: το κουμπί "+" (FAB) πλέον κάνει navigate στο `/dashboard/services/new-v2` αντί να ανοίγει modal, για σελίδες σχετικές με επισκευές.
- `Repairs.js`: αφαιρέθηκε το εικονίδιο "Νέα φόρμα v2 (development)" από τη γραμμή εργαλείων (περιττό πια — το κάνει ήδη το FAB, και δεν είναι πια "πειραματικό").
- Η **επεξεργασία** (edit) υπάρχουσας επισκευής παραμένει ως έχει, με τα παλιά winding components, μέχρι να χτιστεί ο adapter παραπάνω.
