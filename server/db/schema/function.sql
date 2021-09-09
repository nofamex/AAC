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




create or replace function prelim_lolos_checklist()
returns trigger as
$$
  begin
    if (TG_OP = 'UPDATE') then
      if (NEW.status_lolos = 'berhasil' ) then
        update team
        set status_prelim = 'lolos'
        where id = new.team_id;
      elsif (NEW.status_lolos = 'gagal' ) then
        update team
        set status_prelim = 'gagal'
        where id = new.team_id;
      end if;
    end if;
    return new;
  end;
$$
LANGUAGE plpgsql;

create trigger trigger_prelim_unac_lolos_checklist
after update on prelim_unac_master
for each row
execute PROCEDURE prelim_lolos_checklist();

create trigger trigger_prelim_tac_lolos_checklist
after update on prelim_tac_master
for each row
execute PROCEDURE prelim_lolos_checklist();

create or replace function prelim_bayar_checklist()
returns trigger as
$$
  begin
    if (TG_OP = 'UPDATE') then
      if (NEW.status_bayar = 'belum' ) then
        update team
        set status_payment_prelim = 'kosong'
        where id = new.team_id;
      elsif (NEW.status_bayar = 'bayar' ) then
        update team
        set status_payment_prelim = 'bayar'
        where id = new.team_id;
      elsif (NEW.status_bayar = 'verified' ) then
        update team
        set status_payment_prelim = 'verified'
        where id = new.team_id;
      end if;
    end if;
    return new;
  end;
$$
LANGUAGE plpgsql;

create trigger trigger_prelim_unac_bayar_checklist
after update on prelim_unac_master
for each row
execute PROCEDURE prelim_bayar_checklist();

create trigger trigger_prelim_tac_bayar_checklist
after update on prelim_tac_master
for each row
execute PROCEDURE prelim_bayar_checklist();



create or replace function score_battle_of_sandwich()
returns trigger as
$$
  begin
    if (TG_OP = 'INSERT') then 
      -- benar
      if new.jawaban = (select jawaban from elim_unac_battle_of_sandwich where id=new.soal_id) then
        if (select paket from battle_of_sandwich_master where token = new.token) = 1 then
          update elim_unac_master
          set sandwich_1_benar = sandwich_1_benar + 1,
          sandwich_1_kosong = sandwich_1_kosong - 1,
          sandwich_1_score = sandwich_1_score  + 15
          where team_id = new.team_id;
        elsif (select paket from battle_of_sandwich_master where token = new.token) = 2 then
          update elim_unac_master
          set sandwich_2_benar = sandwich_2_benar + 1,
          sandwich_2_kosong = sandwich_2_kosong - 1,
          sandwich_2_score = sandwich_2_score  + 15
          where team_id = new.team_id;
        elsif (select paket from battle_of_sandwich_master where token = new.token) = 3 then
          update elim_unac_master
          set sandwich_3_benar = sandwich_3_benar + 1,
          sandwich_3_kosong = sandwich_3_kosong - 1,
          sandwich_3_score = sandwich_3_score  + 15
          where team_id = new.team_id;
        end if;
        -- all score
        update elim_unac_master
        set total_benar = total_benar + 1,
        total_score = total_score  + 5
        where team_id = new.team_id;
      else
      -- salah
        if (select paket from battle_of_sandwich_master where token = new.token) = 1 then
          update elim_unac_master
          set sandwich_1_salah = sandwich_1_salah + 1,
          sandwich_1_kosong = sandwich_1_kosong - 1,
          sandwich_1_score = sandwich_1_score  -5 
          where team_id = new.team_id;
        elsif (select paket from battle_of_sandwich_master where token = new.token) = 2 then
          update elim_unac_master
          set sandwich_2_salah = sandwich_2_salah + 1,
          sandwich_2_kosong = sandwich_2_kosong - 1,
          sandwich_2_score = sandwich_2_score  -5 
          where team_id = new.team_id;
        elsif (select paket from battle_of_sandwich_master where token = new.token) = 3 then
          update elim_unac_master
          set sandwich_3_salah = sandwich_3_salah + 1,
          sandwich_3_kosong = sandwich_3_kosong - 1,
          sandwich_3_score = sandwich_3_score  -5 
          where team_id = new.team_id;
        end if;
        -- all score
        update elim_unac_master
        set total_salah = total_salah + 1,
        total_score = total_score  - 1.67
        where team_id = new.team_id;
      end if;
    end if;
    if (TG_OP = 'UPDATE') then
      if (OLD.jawaban <> NEW.jawaban) then

      if new.jawaban = (select jawaban from elim_unac_battle_of_sandwich where id=new.soal_id) then
        if (select paket from battle_of_sandwich_master where token = new.token) = 1 then
          update elim_unac_master
          set sandwich_1_benar = sandwich_1_benar + 1,
          sandwich_1_salah = sandwich_1_salah - 1,
          sandwich_1_score = sandwich_1_score  + 20
          where team_id = new.team_id;
        elsif (select paket from battle_of_sandwich_master where token = new.token) = 2 then
          update elim_unac_master
          set sandwich_2_benar = sandwich_2_benar + 1,
          sandwich_2_salah = sandwich_2_salah - 1,
          sandwich_2_score = sandwich_2_score  + 20
          where team_id = new.team_id;
        elsif (select paket from battle_of_sandwich_master where token = new.token) = 3 then
          update elim_unac_master
          set sandwich_3_benar = sandwich_3_benar + 1,
          sandwich_3_salah = sandwich_3_salah - 1,
          sandwich_3_score = sandwich_3_score  + 20
          where team_id = new.team_id;
        end if;
        -- all score
        update elim_unac_master
        set total_benar = total_benar + 1,
        total_salah = total_salah - 1,
        total_score = total_score  + 6.67
        where team_id = new.team_id;
      else
        if (select paket from battle_of_sandwich_master where token = new.token) = 1 then
          update elim_unac_master
          set sandwich_1_benar = sandwich_1_benar - 1,
          sandwich_1_salah = sandwich_1_salah + 1,
          sandwich_1_score = sandwich_1_score  - 20
          where team_id = new.team_id;
        elsif (select paket from battle_of_sandwich_master where token = new.token) = 2 then
          update elim_unac_master
          set sandwich_2_benar = sandwich_2_benar - 1,
          sandwich_2_salah = sandwich_2_salah + 1,
          sandwich_2_score = sandwich_2_score  - 20
          where team_id = new.team_id;
        elsif (select paket from battle_of_sandwich_master where token = new.token) = 3 then
          update elim_unac_master
          set sandwich_3_benar = sandwich_3_benar - 1,
          sandwich_3_salah = sandwich_3_salah + 1,
          sandwich_3_score = sandwich_3_score  - 20
          where team_id = new.team_id;
        end if;
        -- all score
        update elim_unac_master
        set total_benar = total_benar - 1,
        total_salah = total_salah + 1,
        total_score = total_score  - 6.67
        where team_id = new.team_id;
        end if;
      end if;
    end if;
    return new;
  end;
$$
LANGUAGE plpgsql;

create trigger trigger_score_battle_of_sandwich
after insert or update or delete on battle_of_sandwich_jawaban
for each row
execute PROCEDURE score_battle_of_sandwich();


create or replace function score_rescue()
returns trigger as
$$
  begin
    if (TG_OP = 'INSERT') then 
      update rescue_the_number_master
      set kosong = kosong -1
      where team_id = new.team_id;

      if new.jawaban = (select LEFT(RIGHT(jawaban, LENGTH(jawaban) - 3), LENGTH(jawaban) - 7) from elim_unac_rescue_the_number where id=new.soal_id) then
        update rescue_the_number_master
        set benar = benar + 1,
        score = score + 20
        where team_id = new.team_id;

        update elim_unac_master
        set total_benar = total_benar + 1,
        total_score = total_score + 20
        where team_id = new.team_id;
      else
        update rescue_the_number_master
        set salah = salah + 1,
        score = score - 5
        where team_id = new.team_id;

        update elim_unac_master
        set total_salah = total_salah + 1,
        total_score = total_score - 5
        where team_id = new.team_id;
      end if;
    end if;
    if (TG_OP = 'UPDATE') then
      if (OLD.jawaban <> NEW.jawaban) then
        if new.jawaban = (select LEFT(RIGHT(jawaban, LENGTH(jawaban) - 3), LENGTH(jawaban) - 7) from elim_unac_rescue_the_number where id=new.soal_id) then
          update rescue_the_number_master
          set salah = salah - 1,
          benar = benar + 1,
          score = score + 25
          where team_id = new.team_id;

          update elim_unac_master
          set total_benar = total_benar + 1,
          total_salah = total_salah - 1,
          total_score = total_score + 25
          where team_id = new.team_id;

        else
          update rescue_the_number_master
          set salah = salah + 1,
          benar = benar - 1,
          score = score - 25
          where team_id = new.team_id;

          update elim_unac_master
          set total_benar = total_benar - 1,
          total_salah = total_salah + 1,
          total_score = total_score - 25
          where team_id = new.team_id;
        end if;
      end if;
    end if;
    return new;
  end;
$$
LANGUAGE plpgsql;

create trigger trigger_score_rescue
after insert or update or delete on rescue_the_number_jawaban
for each row
execute PROCEDURE score_rescue();





create or replace function score_scratch()
returns trigger as
$$
  begin
    if (TG_OP = 'INSERT') then 
      update scratch_the_hidden_words_master
      set kosong = kosong -1
      where team_id = new.team_id;

      if (select benar from elim_unac_scratch_the_hidden_words where upper(jawaban)=upper(new.jawaban)) then
        update scratch_the_hidden_words_master
        set benar = benar + 1,
        score = score + 5
        where team_id = new.team_id;

        update elim_unac_master
        set total_benar = total_benar + 1,
        total_score = total_score + 10
        where team_id = new.team_id;
      else
        update scratch_the_hidden_words_master
        set salah = salah + 1,
        score = score - 5
        where team_id = new.team_id;

        update elim_unac_master
        set total_salah = total_salah + 1,
        total_score = total_score - 5
        where team_id = new.team_id;
      end if;
    end if;
    if (TG_OP = 'UPDATE') then
      if (OLD.jawaban <> NEW.jawaban) then
        if (select benar from elim_unac_scratch_the_hidden_words where upper(jawaban)=upper(new.jawaban)) then
          update scratch_the_hidden_words_master
          set salah = salah - 1,
          benar = benar + 1,
          score = score + 15
          where team_id = new.team_id;

          update elim_unac_master
          set total_benar = total_benar + 1,
          total_salah = total_salah - 1,
          total_score = total_score + 15
          where team_id = new.team_id;
        else
          update scratch_the_hidden_words_master
          set salah = salah + 1,
          benar = benar - 1,
          score = score - 15
          where team_id = new.team_id;

          update elim_unac_master
          set total_benar = total_benar - 1,
          total_salah = total_salah + 1,
          total_score = total_score - 15
          where team_id = new.team_id;
        end if;
      end if;
    end if;
    return new;
  end;
$$
LANGUAGE plpgsql;

create trigger trigger_score_scratch
after insert or update or delete on scratch_the_hidden_words_jawaban
for each row
execute PROCEDURE score_scratch();