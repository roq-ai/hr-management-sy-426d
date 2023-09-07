import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFavoriteAudioPlayers } from 'apiSdk/favorite-audio-players';
import { favoriteAudioPlayersValidationSchema } from 'validationSchema/favorite-audio-players';
import { UserInterface } from 'interfaces/user';
import { AudioPlayerInterface } from 'interfaces/audio-player';
import { getUsers } from 'apiSdk/users';
import { getAudioPlayers } from 'apiSdk/audio-players';
import { FavoriteAudioPlayersInterface } from 'interfaces/favorite-audio-players';

function FavoriteAudioPlayersCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FavoriteAudioPlayersInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFavoriteAudioPlayers(values);
      resetForm();
      router.push('/favorite-audio-players');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FavoriteAudioPlayersInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      audio_player_id: (router.query.audio_player_id as string) ?? null,
    },
    validationSchema: favoriteAudioPlayersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Favorite Audio Players',
              link: '/favorite-audio-players',
            },
            {
              label: 'Create Favorite Audio Players',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Favorite Audio Players
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<AudioPlayerInterface>
            formik={formik}
            name={'audio_player_id'}
            label={'Select Audio Player'}
            placeholder={'Select Audio Player'}
            fetcher={getAudioPlayers}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/favorite-audio-players')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'favorite_audio_players',
    operation: AccessOperationEnum.CREATE,
  }),
)(FavoriteAudioPlayersCreatePage);
