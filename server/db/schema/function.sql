create or replace function update_statistic()
returns trigger as
$$
  begin
    if (TG_OP = 'INSERT') then
      if (NEW.type = 'tac') then
        update statistics
        set tac_daftar = tac_daftar + 1
        where id = 1;
      end if;
      if (NEW.type = 'unac') then
        update statistics
        set unac_daftar = unac_daftar + 1
        where id = 1;
      end if;
    end if;
    if (TG_OP = 'UPDATE') then
      if (OLD.verified <> NEW.verified) then
        if (NEW.type = 'tac') then
          update statistics
          set tac_verif = tac_verif + 1
          where id = 1;
        end if;
        if (NEW.type = 'unac') then
          update statistics
          set unac_verif = unac_verif + 1
          where id = 1;
        end if;
      end if;
    end if;
    if (TG_OP = 'DELETE') then
      if (NEW.type = 'tac') then
      update statistics
      set tac_daftar = tac_daftar - 1
      where id = 1;
    end if;
      if (NEW.type = 'unac') then
        update statistic
        set unac_daftar = unac_daftar - 1
        where id = 1;
      end if;
    end if;

    return new;
  end;
$$
LANGUAGE plpgsql;

create trigger trigger_statistic
after insert or update or delete on team
for each row
execute PROCEDURE update_statistic();