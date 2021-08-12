export function updateBreakerColor({
  breakerColor,
  strokeGroup,
  fillGroup,
  activeBreaker,
  inactiveBreaker,
}: {
  breakerColor: string;
  strokeGroup: SVGGElement;
  fillGroup: SVGGElement;
  activeBreaker: SVGPathElement;
  inactiveBreaker: SVGPathElement;
}): void {
  const strokeElements = [
    activeBreaker,
    inactiveBreaker,
    ...(strokeGroup.children as HTMLCollectionOf<SVGPathElement>),
  ];

  for (const strokeElement of strokeElements) {
    strokeElement.style.stroke = breakerColor;
  }

  for (const fillElement of ([
    ...fillGroup.children,
  ] as unknown) as HTMLCollectionOf<SVGPathElement>) {
    fillElement.style.fill = breakerColor;
  }
}
