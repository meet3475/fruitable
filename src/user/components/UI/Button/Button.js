import React from 'react';
import { BaseButton } from './Button.style';

function Button({children}) {
    return (
      <BaseButton>
        {children}
      </BaseButton>
    );
}

export default Button;