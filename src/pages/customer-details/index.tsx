import { ChangeEvent, useState } from 'react';

// material-ui
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

// project imports
// import AlertCustomerDelete from './AlertCustomerDelete';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

// assets
import { ArrowLeftOutlined, CameraOutlined } from '@ant-design/icons';

// types
import { useMutation, useQuery } from '@tanstack/react-query';
import { countriesLondon } from 'data/contriesLondon';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { customerAPI } from 'request/customer';
import { ThemeMode } from 'types/config';
import { FormikInputDate } from '../../common/formik/formik-input-date';
import { FormikInputHairAndEyesColor } from '../../common/formik/formik-input-eye-and-hair-color';
import { eyeColors, hairColors } from '../../data/hair-and-eye-color';
import { Customer } from '../../dto/user-dto';
import { Gender } from '../../model/gender';

// constant

// ==============================|| CUSTOMER ADD / EDIT - FORM ||============================== //

export const CustomerDetails = () => {
  const theme = useTheme();

  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  // const [avatar, setAvatar] = useState<string | undefined>(
  //   avatarImage(`./avatar-${customer && customer !== null && customer?.avatar ? customer.avatar : 1}.png`)
  // );

  // useEffect(() => {
  //   if (selectedImage) {
  //     setAvatar(URL.createObjectURL(selectedImage));
  //   }
  // }, [selectedImage]);
  //
  // useEffect(() => {
  //   setLoading(false);
  // }, []);
  const id = params?.id;
  const { isLoading, data, refetch } = useQuery<Customer>({
    queryKey: ['getCustomerDetails', id],
    queryFn: () => customerAPI.getCustomerDetails(id),
    enabled: !!id,
    onSuccess: (data) => {
      for (const [key, value] of Object.entries(data)) {
        !!value && formik.setFieldValue(key, value || '', false);
      }
    }
  });

  const CustomerSchema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    dateOfBirth: yup.string().required('Date Of Birthday is required'),
    gender: yup.string().required('Sex is required'),
    country: yup.string().required('Country is required'),
    height: yup.string().required('Height is required'),
    hairColor: yup.string().required('Hair color is required'),
    eyeColor: yup.string().required('Eye color is required'),
    address: yup.string().required('Address is required').max(45, 'Max height is 45'),
    email: yup.string().email('Misformatted emails'),
    passportNumber: yup.string().required('passportNumber is required').length(9, 'Must be 9 characters'),
    phoneNumber: yup.string().required('Contact number is required')
  });

  const editCustomerMutation = useMutation({
    mutationFn: ({ customerId, params }: { customerId: any; params: any }) => customerAPI.editCustomer(customerId, params),
    onSuccess: () => {
      toast.success('Change success');
      refetch();
    }
  });

  const formik = useFormik<Customer>({
    initialValues: {
      gender: Gender.Female,
      eyeColor: 'Black',
      hairColor: 'Black',
      id: 0,
      fullName: '',
      phoneNumber: '',
      address: '',
      height: 0,
      dateOfBirth: '',
      country: '',
      passportNumber: ''
    } as Customer,
    validationSchema: CustomerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      let obj = {};
      console.log('Submitting...', values);
      for (const [key, value] of Object.entries(values)) {
        const tmpData = data as any;
        if (value !== tmpData[key] && !!value) {
          obj = { ...obj, [key]: value };
        }
      }
      // console.log('obj', obj);
      if (Object.keys(obj).length !== 0) {
        editCustomerMutation.mutate({
          customerId: id,
          params: obj
        });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, dirty } = formik;

  return isLoading ? (
    <Box sx={{ p: 5 }}>
      <Stack direction="row" justifyContent="center">
        <CircularWithPath />
      </Stack>
    </Box>
  ) : (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack ml={2} flexDirection={'row'} alignContent={'center'} alignSelf={'center'}>
              <IconButton
                sx={{
                  alignSelf: 'center'
                }}
                size="large"
                color={'black' as any}
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowLeftOutlined />
              </IconButton>
              <DialogTitle>{data && data?.fullName}</DialogTitle>
            </Stack>

            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      <Avatar
                        alt="Avatar 1"
                        src={'https://th.bing.com/th/id/OIP.w0fCUe4n63FiQ2imwwX81gHaE8?w=265&h=180&c=7&r=0&o=5&pid=1.7'}
                        sx={{ width: 154, height: 154, border: '1px dashed' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack>
                      </Box>
                    </FormLabel>
                    <TextField
                      type="file"
                      id="change-avtar"
                      placeholder="Outlined"
                      variant="outlined"
                      sx={{ display: 'none' }}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="fullName">Full Name</InputLabel>
                        <TextField
                          fullWidth
                          id="fullName"
                          placeholder="Enter full name"
                          {...getFieldProps('fullName')}
                          error={Boolean(touched.fullName && errors.fullName)}
                          helperText={touched.fullName && errors.fullName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={8}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <TextField
                          fullWidth
                          id="email"
                          placeholder="Enter email"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="dateOfBirth">Date of birthday</InputLabel>
                        <FormikInputDate name="dateOfBirth" formik={formik} placeholder="DD/MM/YYYY" />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="identifyNumber">Identify Number</InputLabel>
                        <TextField
                          fullWidth
                          id="identifyNumber"
                          placeholder="Enter indentify number"
                          disabled={!!data?.identifyNumber}
                          {...getFieldProps('identifyNumber')}
                          error={Boolean(touched.identifyNumber && errors.identifyNumber)}
                          helperText={touched.identifyNumber && errors.identifyNumber}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="passportNumber">Passport number</InputLabel>
                        <TextField
                          fullWidth
                          id="passportNumber"
                          placeholder="Enter passport number"
                          {...getFieldProps('passportNumber')}
                          error={Boolean(touched.passportNumber && errors.passportNumber)}
                          helperText={touched.passportNumber && errors.passportNumber}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="height">Height</InputLabel>
                        <TextField
                          fullWidth
                          id="height"
                          placeholder="Enter height"
                          {...getFieldProps('height')}
                          error={Boolean(touched.height && errors.height)}
                          helperText={touched.height && errors.height}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            input={<OutlinedInput />}
                            // MenuProps={MenuProps}
                          >
                            <MenuItem key="Male" value={Gender.Male}>
                              Male
                            </MenuItem>
                            <MenuItem key="Female" value={Gender.Female}>
                              Female
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="hairColor">Hair color</InputLabel>
                        <FormikInputHairAndEyesColor
                          onValueChange={(e) => formik.setFieldValue('hairColor', e)}
                          value={formik.values.hairColor}
                          options={hairColors.map((item) => item.value)}
                          placeholder={'Hair Color'}
                          id="hairColor"
                          errorStatus={formik.touched.hairColor && formik.errors.hairColor}
                          errorMsg={String(formik.errors.hairColor)}
                          name={'hairColor'}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="eyeColor">Eye color</InputLabel>
                        <FormikInputHairAndEyesColor
                          onValueChange={(e) => formik.setFieldValue('eyeColor', e)}
                          value={formik.values.eyeColor}
                          options={eyeColors.map((item) => item.value)}
                          placeholder={'Eye Color'}
                          id="eyeColor"
                          errorStatus={formik.touched.eyeColor && formik.errors.eyeColor}
                          errorMsg={String(formik.errors.hairColor)}
                          name={'eyeColor'}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="phoneNumber">Phone number</InputLabel>
                        <TextField
                          fullWidth
                          id="phoneNumber"
                          placeholder="Enter phone number"
                          {...getFieldProps('phoneNumber')}
                          error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="country">Country</InputLabel>
                        <Box>
                          <Autocomplete
                            id="nationality"
                            value={formik.values.country}
                            onChange={(event: any, newValue: string | null) => {
                              formik.setFieldValue('country', newValue);
                            }}
                            options={countriesLondon.map((item) => item.code)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select nationality"
                                sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                              />
                            )}
                          />
                          {formik.touched.country && formik.errors.country && (
                            <FormHelperText error id="helper-text-nationality">
                              {String(formik.errors.country)}
                            </FormHelperText>
                          )}
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <TextField
                          fullWidth
                          id="address"
                          multiline
                          rows={2}
                          placeholder="Enter address"
                          {...getFieldProps('address')}
                          error={Boolean(touched.address && errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Stack>
                    </Grid>
                    {!!data?.idlOrder?.iamaddNo && (
                      <Grid item xs={12}>
                        <InputLabel>
                          This is your detail order link:
                          <Link
                            sx={{
                              ml: 1
                            }}
                            onClick={() => {}}
                            {...{ className: 'cursor-pointer prevent-select' }}
                          >
                            {data?.idlOrder?.iamaddNo}
                          </Link>
                        </InputLabel>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="flex-end">
                <Grid item />
                <Grid item alignSelf={'flex-end'}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      color="error"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {'Edit'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
    </>
  );
};
