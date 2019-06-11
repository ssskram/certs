export default function certificationName(certId, certifications) {
  const certification = certifications.find(c => c.certID == certId);
  return certification.certName;
}
