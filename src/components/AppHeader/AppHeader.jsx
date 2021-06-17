import React from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = ((props) => {
    return (
        <header>
            <Button type="secondary" size="small" ><BurgerIcon type="success" />Конструктор</Button>
            <Logo />
        </header>
    )
});

export default AppHeader;