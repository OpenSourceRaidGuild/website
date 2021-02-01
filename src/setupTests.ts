import '@testing-library/jest-dom/extend-expect'

jest.mock('./utils/useFirestore', () => {
  const firestore = () =>
    jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          add: jest.fn().mockResolvedValue({
            id: 'abc123',
            name: 'xxxx',
          }),
          get: jest.fn().mockResolvedValue({
            id: 'abc123',
            name: 'xxxx',
          }),
          set: jest.fn().mockResolvedValue({
            uid: 'abc123',
          }),
        }),
      }),
    })
  return firestore
})
