import React from 'react';
import PropTypes from 'prop-types';

const Form = props => {
    let input;
    const { onSubmit } = props;
    return (
        <span>
            <h1>Search for a Github username</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (input.value !== '') {
                        onSubmit(input.value);
                    }
                }}
            >
                <input
                    type="text"
                    ref={node => {
                        input = node;
                    }}
                />
             
                <input type="submit" value="Search" />
            </form>
        </span>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Form;
