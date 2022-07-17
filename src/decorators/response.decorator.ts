export const R = (): MethodDecorator => {
  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value
    descriptor.value = (...args: any[]) => {
      const data = method.apply(this, ...args)
      return {
        result: true,
        data
      }
    }
  }
}
