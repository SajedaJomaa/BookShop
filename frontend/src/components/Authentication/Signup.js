
import { Form, useNavigation, useActionData } from 'react-router-dom';
import { useInput } from '../../hooks/useInput.js';
import { isEmail, isNotEmpty, hasMinLength } from '../../services/validation.js';

import Input from '../Common/Input.js';
import classes from './signup.module.css';

export default function Signup() {
    const data = useActionData();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';
    const { value: emailValue,
        handleInputChange: handelEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

    const { value: firstNameValue,
        handleInputChange: handelFirstNameChange,
        handleInputBlur: handleFirstNameBlur,
        hasError: firstNameHasError
    } = useInput('', (value) => isNotEmpty(value));

    const { value: lastNameValue,
        handleInputChange: handelLastNameChange,
        handleInputBlur: handleLastNameBlur,
        hasError: lastNameHasError
    } = useInput('', (value) => isNotEmpty(value));

    const { value: passwordValue,
        handleInputBlur: handlePasswordBlur,
        handleInputChange: handlePasswordChange,
        hasError: passwordHasError
    } = useInput('', (value) => hasMinLength(value, 6));


    return (
        <>
            <div className={classes.container}>
                <h1 className={classes.siteName}>Design Books</h1>

            </div>
            <Form method="post" className={classes.forAuth}>
                <h2>Welcome on board!</h2>
                <p>We just need a little bit of data from you to get you started 🚀</p>
                {data && data.errors && (
                    <ul>
                        {Object.values(data.errors).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
                {data && data.message && <p>{data.message}</p>}

                <div className={classes.control}>
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        onBlur={handleEmailBlur}
                        error={emailHasError && 'Please enter a valid email.'}
                        onChange={handelEmailChange}
                        value={emailValue}
                    />
                </div>

                <div className={classes.controlrow}>
                    <div className={classes.control}>
                        <Input
                            label="Password"
                            id="password"
                            type="password"
                            name="password"
                            onChange={handlePasswordChange}
                            onBlur={handlePasswordBlur}
                            value={passwordValue}
                            error={passwordHasError && 'Please enter a valid password.'}
                        />
                    </div>

                    <div className={classes.control}>
                        <Input
                            label="Confirm Password"
                            id="confirm-password"
                            type="password"
                            name="confirm-password"
                        />
                    </div>
                </div>

                <hr />

                <div className={classes.controlrow}>
                    <div className={classes.control}>
                        <Input
                            label="First Name"
                            type="text"
                            id="first-name"
                            name="first-name"
                            onBlur={handleFirstNameBlur}
                            error={lastNameHasError && 'Please enter a valid last name.'}
                            onChange={handelFirstNameChange}
                            value={firstNameValue} />
                    </div>

                    <div className={classes.control}>
                        <Input
                            label="Last Name"
                            type="text"
                            id="last-name"
                            name="last-name"
                            onBlur={handleLastNameBlur}
                            error={firstNameHasError && 'Please enter a valid first name.'}
                            onChange={handelLastNameChange}
                            value={lastNameValue} />
                    </div>
                </div>

                <div className={classes.control}>
                    <label htmlFor="phone">What best describes your role?</label>
                    <select id="role" name="role">
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="employee">Employee</option>
                        <option value="founder">Founder</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <fieldset>
                    <legend>How did you find us?</legend>
                    <div className={classes.control}>
                        <input
                            type="checkbox"
                            id="google"
                            name="acquisition"
                            value="google"
                        />
                        <label htmlFor="google">Google</label>
                    </div>

                    <div className={classes.control}>
                        <input
                            type="checkbox"
                            id="friend"
                            name="acquisition"
                            value="friend"
                        />
                        <label htmlFor="friend">Referred by friend</label>
                    </div>

                    <div className={classes.control}>
                        <input type="checkbox" id="other" name="acquisition" value="other" />
                        <label htmlFor="other">Other</label>
                    </div>
                </fieldset>

                <div className={classes.control}>
                    <label htmlFor="terms-and-conditions">
                        <input type="checkbox" id="terms-and-conditions" name="terms" />I
                        agree to the terms and conditions
                    </label>
                </div>

                <p className={classes.formactions}>
                    <button type="reset" className={classes.button}>
                        Reset
                    </button>
                    <button className={classes.button} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Save'}
                    </button>
                </p>
            </Form>
        </>
    )
}
