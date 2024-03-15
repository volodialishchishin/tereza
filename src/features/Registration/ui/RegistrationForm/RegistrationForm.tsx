import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRegisterUsername } from '../../model/selectors/getRegisterUsername/getRegisterUsername';
import { getRegisterPasswrod } from '../../model/selectors/getRegisterPassword/getRegisterPasswrod';
import { getRegisterIsLoading } from '../../model/selectors/getRegisterIsLoading/getRegisterIsLoading';
import { registerByUsernameAndEmail } from '../../model/services/registerByUsernameAndEmail/registerByUsernameAndEmail';
import { registerActions, registerReducer } from '../../model/slice/registerSlice';
import cls from './RegistrationForm.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { getRegisterError } from '../../model/selectors/getRegisterError/getRegisterError';
import { getRegisterEmail } from '../../model/selectors/getRegisterEmail/getRegisterUsername';

export interface RegisterFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    registerForm: registerReducer,
};

const RegistrationForm = memo(({ className, onSuccess }: RegisterFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getRegisterUsername);
    const email = useSelector(getRegisterEmail);
    const password = useSelector(getRegisterPasswrod);
    const isLoading = useSelector(getRegisterIsLoading);
    const error = useSelector(getRegisterError);
    const forceUpdate = useForceUpdate();

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(registerActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(registerActions.setPassword(value));
        },
        [dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(registerActions.setEmail(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(registerByUsernameAndEmail({ username, email, password }));
        console.log(result);
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
        }
    }, [dispatch, username, password, email, onSuccess, forceUpdate]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <VStack
                                    gap="16"
                                    className={classNames(cls.RegisterForm, {}, [className])}
                                >
                                    <Text title={t('Форма Реєстрації')} />
                                    {error && (
                                        <Text
                                            text={t('Помилка реєстрації')}
                                            variant="error"
                                        />
                                    )}
                                    <Input
                                        autofocus
                                        type="text"
                                        className={cls.input}
                                        placeholder={t('Ведіть username')}
                                        onChange={onChangeUsername}
                                        value={username}
                                    />
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t('Ведіть email')}
                    onChange={onChangeEmail}
                    value={email}
                />
                                    <Input
                                        type="text"
                                        className={cls.input}
                                        placeholder={t('Ведіть пароль')}
                                        onChange={onChangePassword}
                                        value={password}
                                    />
                                    <Button
                                        className={cls.registerBtn}
                                        onClick={onLoginClick}
                                        disabled={isLoading}
                                    >
                                        {t('Зареєструватись')}
                                    </Button>
                                </VStack>
        </DynamicModuleLoader>
    );
});

export default RegistrationForm;
