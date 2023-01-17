export default function calculateNextItvDate(licenseDate, lastItvDate) {
    const now = new Date
    const yearNow = now.getFullYear()

    const licenseYear = licenseDate.getFullYear()
    const lastInspectionYear = lastItvDate && lastItvDate.getFullYear()

    const age = yearNow - licenseYear

    if (age < 4) {
        if (!lastItvDate) {
            const licenseMonth = licenseDate.getMonth()
            const licenseDay = licenseDate.getDate()

            const nextInspectionYear = licenseYear + 4

            const nextInspectionDate = new Date(nextInspectionYear, licenseMonth, licenseDay)

            return nextInspectionDate
        } else if (lastItvDate) {
            const licenseMonth = licenseDate.getMonth()
            const licenseDay = licenseDate.getDate()

            const nextInspectionYear = lastInspectionYear + 2

            const nextInspectionDate = new Date(nextInspectionYear, licenseMonth, licenseDay)

            return nextInspectionDate
        }
    } else if (age < 10) {
        if (!lastItvDate) {
            const licenseMonth = licenseDate.getMonth()
            const licenseDay = licenseDate.getDate()

            const nextInspectionYear = licenseYear + 4

            const nextInspectionDate = new Date(nextInspectionYear, licenseMonth, licenseDay)

            return nextInspectionDate
        } else if (lastItvDate) {
            const licenseMonth = licenseDate.getMonth()
            const licenseDay = licenseDate.getDate()

            const nextInspectionYear = lastInspectionYear + 2

            const nextInspectionDate = new Date(nextInspectionYear, licenseMonth, licenseDay)

            return nextInspectionDate
        }
    } else {
        if (!lastItvDate) {
            const licenseMonth = licenseDate.getMonth()
            const licenseDay = licenseDate.getDate()

            const nextInspectionYear = licenseYear + 4

            const nextInspectionDate = new Date(nextInspectionYear, licenseMonth, licenseDay)

            return nextInspectionDate
        } else if (lastItvDate) {
            const licenseMonth = licenseDate.getMonth()
            const licenseDay = licenseDate.getDate()

            const nextInspectionYear = lastInspectionYear + 1

            const nextInspectionDate = new Date(nextInspectionYear, licenseMonth, licenseDay)

            return nextInspectionDate
        }
    }
}
