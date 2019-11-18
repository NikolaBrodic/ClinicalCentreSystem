package ftn.tim16.ClinicalCentreSystem.enumeration;

public enum ExaminationKind {
    EXAMINATION {
        public String toString() {
            return "Examination";
        }
    },
    OPERATION {
        public String toString() {
            return "Operation";
        }
    }
}
