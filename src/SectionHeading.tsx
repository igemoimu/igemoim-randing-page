type SectionHeadingProps = {
  index: string
  label: string
}

export function SectionHeading({ index, label }: SectionHeadingProps) {
  return (
    <>
      <p className="section-kicker">{index}</p>
      <h2 className="section-title">{label}</h2>
    </>
  )
}
