interface Example1Props {
  /**
   * @deprecated
   */
  isDisabled?: boolean
  disabled?: boolean
}

export const Example4 = ({ isDisabled = false, disabled = false }: Example1Props) => {
  disabled ??= isDisabled

  console.error(`isDisabled: ${isDisabled}`)
  console.error(`disabled: ${disabled}`)
}
