import { useState } from 'react';

import styled from '@emotion/styled';

import PuffLoader from 'react-spinners/PuffLoader';

const LoadingWapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Loading = () => {
    const [color, setColor] = useState('#e5a714');
    const [size, setSize] = useState(50);

    return (
        <LoadingWapper>
            <PuffLoader color={color} size={size} />
        </LoadingWapper>
    );
};

export default Loading;
