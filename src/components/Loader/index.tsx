// credit: https://bit.dev/joshk/react-spinners-css/heart
import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

interface LoaderProps {
    colour: string;
    style: object;
    size: number;
}

export default function Loader({ colour, style, size }: LoaderProps) {
    return (
        <div className="lds-heart" style={{ width: size, height: size, ...style }}>
            <div
                style={{
                    background: colour,
                    width: size * 0.4,
                    height: size * 0.4,
                    left: size * 0.3,
                    top: size * 0.3
                }}
            >
                <div
                    className="div-before"
                    style={{
                        background: colour,
                        width: size * 0.4,
                        height: size * 0.4,
                        left: -size * 0.3
                    }}
                ></div>
                <div
                    className="div-after"
                    style={{
                        background: colour,
                        width: size * 0.4,
                        height: size * 0.4,
                        top: -size * 0.3
                    }}
                ></div>
            </div>
        </div>
    );
}

Loader.propTypes = {
    /** hex color */
    colour: PropTypes.string,
    /** style object */
    style: PropTypes.object,
    /** size in pixel */
    size: PropTypes.number
};

Loader.defaultProps = {
    colour: '#ff6961',
    style: {},
    size: 128
};
