const InternalForm = ({
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    isSubmitting
}) => (
        <Form>
            <Field
                styleName={ errors.name && touched.name !== undefined ? 'with-error' : '' }
                label="Name"
                name="name"
                onChange={handleChange}
                placeholder="Full Name"
                onBlur={handleBlur}
            />
            {
                errors.name && touched.name &&
                <div className="error">
                    {errors.name}
                </div>
            }
            <Field
                styleName={ errors.email && touched.email !== undefined ? 'with-error' : '' }
                type="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                placeholder="Enter Your Email"
                onBlur={handleBlur}
            />
            {
                errors.email && touched.email &&
                <div className="error">
                    {errors.email}
                </div>
            }

            <Field
                styleName={ errors.confirmEmail && touched.confirmEmail !== undefined ? 'with-error' : '' }
                type="email"
                label="Confirm Email"
                name="confirmEmail"
                onChange={handleChange}
                placeholder="Confirm new email"
                onBlur={handleBlur}
            />
            {
                errors.confirmEmail && touched.confirmEmail &&
                <div className="error">
                    {errors.confirmEmail}
                </div>
            }
            <PrimarySubmitButton value="Submit" disabled={isSubmitting}/>
        </Form>
    )

const UserForm = withFormik({
    mapPropsToValues({ initialValues }) {
        return {
            name: initialValues.name || '',
            email: initialValues.email || '',
            confirmEmail: ''
        }
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name must be provided.'),
        email: Yup.string().email('Must be a valid email address').required('Email is required'),
        confirmEmail: Yup.string().oneOf([Yup.ref('email')], 'Email address don\'t match').required('Confirmation email is required')
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
            axios.post(`${api.baseURL}/post/new/user`, values, { headers: { ...myHeaders } })
                .then(response => alert(response))
                .catch(error => alert(error))
    }
})(InternalForm)

return (
    <UserForm
        initialValues={this.props.initialValues}
    />
)