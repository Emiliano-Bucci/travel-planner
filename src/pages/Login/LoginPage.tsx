import logo from '@/assets/images/logo.png';
import { css } from '@/styled-system/css';
import { Button } from '@/ui/Button';
import { Image } from '@/ui/Image';
import { Text } from '@/ui/Text';
import type { SupabaseClient } from '@supabase/supabase-js';

type Props = {
  supabase: SupabaseClient;
};

export function LoginPage({ supabase }: Props) {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        inset: '0',
        width: '100%',
        height: '100%',
      })}
    >
      <div
        className={css({
          display: 'grid',
          gap: '24px',
          bg: '#fff',
          w: '100%',
          maxW: '440px',
          borderRadius: '24px',
          p: '24px',
          boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)',
        })}
      >
        <div
          className={css({
            display: 'grid',
            justifyItems: 'center',
            gap: '12px',
            mx: 'auto',
          })}
        >
          <Image
            src={logo}
            wrapperStyles={css.raw({
              w: '80px',
              h: '80px',
              zIndex: '0',
            })}
          />
          <Text
            textSize="display-s"
            className={css({
              mx: 'auto',
            })}
          >
            Travel Planer
          </Text>
        </div>
        <Button
          onClick={async () => {
            try {
              const res = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                  redirectTo: 'http://localhost:3000',
                },
              });
              console.log(res);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Accedi con Google
        </Button>
      </div>
    </div>
  );
}
