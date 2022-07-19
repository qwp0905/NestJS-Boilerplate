export type Mock<T> = Partial<Record<keyof T, jest.Mock>>
