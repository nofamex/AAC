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
      if (NEW.type = 'tac') then
        update statistics
        set tac_daftar = tac_daftar + 1
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
        if (NEW.type = 'tac') then
          update statistics
          set tac_verif = tac_verif + 1
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
      if (NEW.type = 'tac') then
        update statistic
        set tac_daftar = tac_daftar - 1
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




create or replace function score_tac_pg()
returns trigger as
$$
  begin
    if (TG_OP = 'INSERT') then 
      update prelim_tac_master
      set kosong = kosong -1
      where team_id = new.team_id;

      if new.jawaban = (select jawaban from prelim_tac_pg where id=new.soal_id) then
        update prelim_tac_master
        set benar = benar + 1
        where team_id = new.team_id;

        update prelim_tac_master
        set score = score + (select bobot from prelim_tac_pg where id = new.soal_id) + 2
        where team_id = new.team_id;
      else
        update prelim_tac_master
        set salah = salah + 1
        where team_id = new.team_id;

        update prelim_tac_master
        set score = score - (select bobot from prelim_tac_pg where id = new.soal_id)
        where team_id = new.team_id;
      end if;
    end if;
    if (TG_OP = 'UPDATE') then
      if (OLD.jawaban <> NEW.jawaban) then
        if new.jawaban = (select jawaban from prelim_tac_pg where id=new.soal_id) then
          update prelim_tac_master
          set benar = benar + 1
          where team_id = new.team_id;
          
          update prelim_tac_master
          set salah = salah - 1
          where team_id = new.team_id;
          
          update prelim_tac_master
          set score = score + 2*(select bobot from prelim_tac_pg where id = new.soal_id) + 2
          where team_id = new.team_id;
        elsif old.jawaban = (select jawaban from prelim_tac_pg where id=new.soal_id) then
          update prelim_tac_master
          set benar = benar - 1
          where team_id = new.team_id;
          
          update prelim_tac_master
          set salah = salah + 1
          where team_id = new.team_id;
          
          update prelim_tac_master
          set score = score - 2*(select bobot from prelim_tac_pg where id = new.soal_id) - 2
          where team_id = new.team_id;
        end if;
      end if;
    end if;
    return new;
  end;
$$
LANGUAGE plpgsql;

create trigger trigger_score_tac_pg
after insert or update or delete on prelim_tac_pg_jawaban
for each row
execute PROCEDURE score_tac_pg();





create or replace function score_unac_pg()
returns trigger as
$$
  begin
    if (TG_OP = 'INSERT') then 
      update prelim_unac_master
      set kosong = kosong -1
      where team_id = new.team_id;

      if new.jawaban = (select jawaban from prelim_unac_pg where id=new.soal_id) then
        update prelim_unac_master
        set benar = benar + 1
        where team_id = new.team_id;

        update prelim_unac_master
        set score = score + (select bobot from prelim_unac_pg where id = new.soal_id) + 2
        where team_id = new.team_id;
      else
        update prelim_unac_master
        set salah = salah + 1
        where team_id = new.team_id;

        update prelim_unac_master
        set score = score - (select bobot from prelim_unac_pg where id = new.soal_id)
        where team_id = new.team_id;
      end if;
    end if;
    if (TG_OP = 'UPDATE') then
      if (OLD.jawaban <> NEW.jawaban) then
        if new.jawaban = (select jawaban from prelim_unac_pg where id=new.soal_id) then
          update prelim_unac_master
          set benar = benar + 1
          where team_id = new.team_id;
          
          update prelim_unac_master
          set salah = salah - 1
          where team_id = new.team_id;
          
          update prelim_unac_master
          set score = score + 2*(select bobot from prelim_unac_pg where id = new.soal_id) + 2
          where team_id = new.team_id;
        elsif old.jawaban = (select jawaban from prelim_unac_pg where id=new.soal_id) then
          update prelim_unac_master
          set benar = benar - 1
          where team_id = new.team_id;
          
          update prelim_unac_master
          set salah = salah + 1
          where team_id = new.team_id;
          
          update prelim_unac_master
          set score = score - 2*(select bobot from prelim_unac_pg where id = new.soal_id) - 2
          where team_id = new.team_id;
        end if;
      end if;
    end if;
    return new;
  end;
$$
LANGUAGE plpgsql;

create trigger trigger_score_unac_pg
after insert or update or delete on prelim_unac_pg_jawaban
for each row
execute PROCEDURE score_unac_pg();





create or replace function score_unac_isian()
returns trigger as
$$
  begin
    if (TG_OP = 'INSERT') then 
      update prelim_unac_master
      set kosong = kosong -1
      where team_id = new.team_id;

      if new.jawaban in (select regexp_split_to_table(LEFT(RIGHT(jawaban, LENGTH(jawaban) - 3), LENGTH(jawaban) - 7), ';') from prelim_unac_isian where id=new.soal_id) then
        update prelim_unac_master
        set benar = benar + 1
        where team_id = new.team_id;

        update prelim_unac_master
        set score = score + 2*(select bobot from prelim_unac_isian where id = new.soal_id) + 2
        where team_id = new.team_id;
      else
        update prelim_unac_master
        set salah = salah + 1
        where team_id = new.team_id;

        update prelim_unac_master
        set score = score - (select bobot from prelim_unac_isian where id = new.soal_id) - 1
        where team_id = new.team_id;
      end if;
    end if;
    if (TG_OP = 'UPDATE') then
      if (OLD.jawaban <> NEW.jawaban) then
        if new.jawaban in (select regexp_split_to_table(LEFT(RIGHT(jawaban, LENGTH(jawaban) - 3), LENGTH(jawaban) - 7), ';') from prelim_unac_isian where id=new.soal_id)  then
          update prelim_unac_master
          set benar = benar + 1
          where team_id = new.team_id;
          
          update prelim_unac_master
          set salah = salah - 1
          where team_id = new.team_id;
          
          update prelim_unac_master
          set score = score + 3*(select bobot from prelim_unac_isian where id = new.soal_id) + 3
          where team_id = new.team_id;
        elsif old.jawaban in (select regexp_split_to_table(LEFT(RIGHT(jawaban, LENGTH(jawaban) - 3), LENGTH(jawaban) - 7), ';') from prelim_unac_isian where id=new.soal_id)  then
          update prelim_unac_master
          set benar = benar - 1
          where team_id = new.team_id;
          
          update prelim_unac_master
          set salah = salah + 1
          where team_id = new.team_id;
          
          update prelim_unac_master
          set score = score - 3*(select bobot from prelim_unac_isian where id = new.soal_id) - 3
          where team_id = new.team_id;
        end if;
      end if;
    end if;
    return new;
  end;
$$
LANGUAGE plpgsql;

create trigger trigger_score_unac_isian
after insert or update or delete on prelim_unac_isian_jawaban
for each row
execute PROCEDURE score_unac_isian();