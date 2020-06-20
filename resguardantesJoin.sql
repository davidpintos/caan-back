
SELECT p.nombres, r.nombres as Resguardante
FROM personas as p,
resguardantes as r,
personas_resguardantes as pr
WHERE pr."idResguardante" > 0
      AND pr."idPersona" = p.id
      AND pr."idResguardante" = r.id