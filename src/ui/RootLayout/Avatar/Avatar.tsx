import { useAuthStore } from '@/stores/useAuthStore';
import { css } from '@/styled-system/css';
import { Image } from '@/ui/Image';

export function Avatar() {
  const { session } = useAuthStore();
  const user = session?.user;
  return (
    <div
      className={css({
        w: '40px',
        h: '40px',
        borderRadius: '50%',
      })}
    >
      <Image
        src={user?.user_metadata.avatar_url}
        wrapperStyles={css.raw({
          borderRadius: '50%',
        })}
      />
    </div>
  );
}
