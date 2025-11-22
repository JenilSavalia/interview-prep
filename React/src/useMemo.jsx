import React, { useMemo } from 'react'

export const UseMemoDemo = () => {
    const user = {
        name: "Umais",
        baseSalary: 60000,
        tax: 5000,
        bonus: 10000,
        homeAllowance: 15000,
        fuelAllowance: 5000,
    }

    const grossSalary = useMemo(() => (user.baseSalary + user.bonus + user.homeAllowance + user.fuelAllowance) - user.tax, [user]);

    return (
        <div>
            <p>{`${user.name} has gross salary ${grossSalary}`}</p>
        </div>
    )
}

