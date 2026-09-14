'use client';

import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { Toaster, toast } from 'react-hot-toast';
import * as Yup from 'yup';

import {
  createBookingRequest,
  type BookingRequest,
} from '@/services/carService';

import styles from './BookingForm.module.css';

interface BookingFormProps {
  carId: string;
}

const initialValues: BookingRequest = {
  name: '',
  email: '',
  comment: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Please enter your full name.')
    .matches(
      /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u,
      'Please enter your full name.',
    )
    .required('Please enter your full name.'),

  email: Yup.string()
    .trim()
    .email('Please enter your email.')
    .required('Please enter your email.'),

  comment: Yup.string().trim().required('Comment is required'),
});

export default function BookingForm({ carId }: BookingFormProps) {
  const bookingMutation = useMutation({
    mutationFn: (values: BookingRequest) => createBookingRequest(carId, values),
  });

  const handleSubmit = async (
    values: BookingRequest,
    actions: FormikHelpers<BookingRequest>,
  ) => {
    try {
      await bookingMutation.mutateAsync(values);

      toast.success('Your booking request has been sent!');
      actions.resetForm();
    } catch {
      toast.error('Failed to send booking request.');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => {
          const nameHasError = Boolean(touched.name && errors.name);

          const emailHasError = Boolean(touched.email && errors.email);

          const commentHasError = Boolean(touched.comment && errors.comment);

          return (
            <section className={styles.card}>
              <div className={styles.heading}>
                <h2 className={styles.title}>Book your car now</h2>

                <p className={styles.subtitle}>
                  Stay connected! We are always ready to help you.
                </p>
              </div>

              <Form className={styles.form} noValidate>
                <div className={styles.fields}>
                  <div className={styles.fieldWrapper}>
                    <label
                      className={
                        nameHasError
                          ? styles.floatingLabel
                          : styles.visuallyHidden
                      }
                      htmlFor="booking-name"
                    >
                      Name*
                    </label>

                    <Field
                      id="booking-name"
                      className={`${styles.input} ${
                        nameHasError ? styles.inputError : ''
                      }`}
                      type="text"
                      name="name"
                      placeholder={nameHasError ? 'Name' : 'Name*'}
                      autoComplete="name"
                      aria-invalid={nameHasError}
                      aria-describedby={nameHasError ? 'name-error' : undefined}
                    />

                    {nameHasError && (
                      <IoAlertCircleOutline
                        className={styles.errorIcon}
                        aria-hidden="true"
                      />
                    )}

                    <ErrorMessage
                      id="name-error"
                      name="name"
                      component="span"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label
                      className={
                        emailHasError
                          ? styles.floatingLabel
                          : styles.visuallyHidden
                      }
                      htmlFor="booking-email"
                    >
                      Email*
                    </label>

                    <Field
                      id="booking-email"
                      className={`${styles.input} ${
                        emailHasError ? styles.inputError : ''
                      }`}
                      type="email"
                      name="email"
                      placeholder={emailHasError ? 'Email' : 'Email*'}
                      autoComplete="email"
                      aria-invalid={emailHasError}
                      aria-describedby={
                        emailHasError ? 'email-error' : undefined
                      }
                    />

                    {emailHasError && (
                      <IoAlertCircleOutline
                        className={styles.errorIcon}
                        aria-hidden="true"
                      />
                    )}

                    <ErrorMessage
                      id="email-error"
                      name="email"
                      component="span"
                      className={styles.errorMessage}
                    />
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label
                      className={styles.visuallyHidden}
                      htmlFor="booking-comment"
                    >
                      Comment
                    </label>

                    <Field
                      id="booking-comment"
                      as="textarea"
                      className={`${styles.textarea} ${
                        commentHasError ? styles.inputError : ''
                      }`}
                      name="comment"
                      placeholder="Comment"
                      aria-invalid={commentHasError}
                      aria-describedby={
                        commentHasError ? 'comment-error' : undefined
                      }
                    />

                    {commentHasError && (
                      <IoAlertCircleOutline
                        className={`${styles.errorIcon} ${styles.textareaErrorIcon}`}
                        aria-hidden="true"
                      />
                    )}

                    <ErrorMessage
                      id="comment-error"
                      name="comment"
                      component="span"
                      className={styles.errorMessage}
                    />
                  </div>
                </div>

                <button
                  className={styles.button}
                  type="submit"
                  disabled={isSubmitting || bookingMutation.isPending}
                  aria-busy={bookingMutation.isPending}
                >
                  {bookingMutation.isPending ? 'Sending...' : 'Send'}
                </button>
              </Form>
            </section>
          );
        }}
      </Formik>
    </>
  );
}
