import '!style-loader!css-loader!sass-loader!../src/index.scss';
import type {Preview} from '@storybook/react';

const preview: Preview = {
    parameters: {
        controls:{
            matchers:(
                {
                    color: /(background|color)$/i,
                    date: /Date$/,
                }
            )
        }
    },
};

export default preview;