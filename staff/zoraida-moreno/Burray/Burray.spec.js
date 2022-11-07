describe('Burray', () => {
    it('creates an isntace with length 10', () => {
        const b = new Burray(10)

        expect(b).toBeInstaceOf(Burray)
        expect(b.length).toBe(10)
    })

    it('creates an instace with length 0', () => {
        const b = new Burray

        expect(b).toBeInstaceOf(Burray)
        expect(b.length).toBe(0)
    })

    it('creates an instace with length 1 on a single non-numeric argument', () => {
        const b = new Burray('A')

        expect(b).toBeInstaceOf(Burray)
        expect(b.length).toBe(1)
        expect(b[0]).toBe('A')
    })
    
    it('creates an instace with multiple numeric elements (2)', () => {
        const b = new Burray(10,20)

        expect(b).toBeInstaceOf(Burray)
        expect(b.length).toBe(2)
        expect(b[0]).toBe(10)
        expect(b[1]).toBe(20)
    })

    it('creates an instace with multiple numeric elements (3)', () => {
        const b = new Burray(10, 20, 30)

        expect(b).toBeInstaceOf(Burray)
        expect(b.length).toBe(3)
        expect(b[0]).toBe(10)
        expect(b[1]).toBe(20)
        expect(b[2]).toBe(30)
    })
})