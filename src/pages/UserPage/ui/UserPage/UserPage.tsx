import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchUsers } from '../../model/services/fetchUsers';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { userListReducer } from '../../model/slice/users.slice';
import { UserListItem } from './userListItem';
import { ArticleView } from '@/entities/Article';

const initialReducers: ReducersList = {
    userListSchema:userListReducer,
};
const UserPage = () => {
    const users = useSelector((state:StateSchema) => state?.userListSchema?.users)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    console.log('hello');

    return(
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div>
                {users?.map((user) => {
                    return <UserListItem buttonTitle="Почати чат" to={`/users/${user?.id}/chat`} view={ArticleView.BIG} user={user}
key={user.id} />
                })}
            </div>
        </DynamicModuleLoader>

    )
};

export default UserPage;
